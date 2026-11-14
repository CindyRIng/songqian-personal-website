/**
 * Posts content layer — the single place that knows how multilingual essays
 * are loaded, deduplicated, sorted and rendered.
 *
 * Content convention (see src/content.config.ts):
 *   src/content/posts/<locale>/<slug>.mdx   ->  collection id `<locale>/<slug>`
 *
 * Translation strategy:
 *   - `getAllPosts(lang)` prefers the requested locale.
 *   - Missing translations fall back to English and are flagged (`isFallback`),
 *     so pages can show a quiet "only available in English" note.
 *   - Every entry keeps a `translations` list so the language switcher / hreflang
 *     can be honest about which languages actually exist for a given slug.
 */
import { getCollection, render as renderContentEntry, type CollectionEntry } from 'astro:content';
import { defaultLocale, isLocale, locales, type Locale } from '../i18n/config';
import { readingTime as estimateReadingTime } from '../i18n/utils';

export type PostCategory = 'design' | 'engineering' | 'life' | 'notes';

export type RawPost = CollectionEntry<'posts'>;

export interface PostEntry {
  /** Canonical, locale-independent slug (same across translations). */
  slug: string;
  /** Locale of the content actually returned (may differ from `requestedLang`). */
  lang: Locale;
  /** Locale the page was asked for. */
  requestedLang: Locale;
  /** True when the content shown is not available in `requestedLang`. */
  isFallback: boolean;
  /** Locales that have a real translation of this slug. */
  translations: Locale[];
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  tags: string[];
  category: PostCategory;
  featured: boolean;
  cover?: string;
  coverAlt?: string;
  /** Minutes, from frontmatter when provided, otherwise estimated from the body. */
  readingTime: number;
  /** Locale-free URL, e.g. `/writing/the-quiet-craft-of-interfaces`. */
  path: string;
  /** The underlying collection entry (for `render()`). */
  entry: RawPost;
}

export interface PostsOptions {
  /** Include drafts (default: false, drafts only visible in `astro dev`). */
  includeDrafts?: boolean;
  /** Maximum number of posts to return. */
  limit?: number;
}

export const POSTS_PAGE_SIZE = 8;

/* -------------------------------------------------------------------------- */
/* Loading + indexing                                                         */
/* -------------------------------------------------------------------------- */

const idOf = (entry: RawPost): string => String(entry.id);
const slugOf = (entry: RawPost): string => {
  const dataSlug = (entry.data as { slug?: string }).slug;
  if (dataSlug) return dataSlug;
  const id = idOf(entry);
  const parts = id.split('/');
  return parts[parts.length - 1] ?? id;
};
const langOf = (entry: RawPost): Locale => {
  const [first] = idOf(entry).split('/');
  return isLocale(first) ? first : defaultLocale;
};

let indexPromise: Promise<Map<string, Map<Locale, RawPost>>> | null = null;

/** slug -> locale -> entry. Built once per build process. */
function loadIndex(): Promise<Map<string, Map<Locale, RawPost>>> {
  indexPromise ??= (async () => {
    const entries = await getCollection('posts');
    const index = new Map<string, Map<Locale, RawPost>>();
    for (const entry of entries) {
      const slug = slugOf(entry);
      const lang = langOf(entry);
      const byLocale = index.get(slug) ?? new Map<Locale, RawPost>();
      // A duplicate translation for the same slug/locale would be a content bug;
      // keep the first one instead of crashing the build.
      if (!byLocale.has(lang)) byLocale.set(lang, entry);
      index.set(slug, byLocale);
    }
    return index;
  })();
  return indexPromise;
}

/** Locale preference chain: requested locale, then English, then anything. */
function pickTranslation(
  byLocale: Map<Locale, RawPost>,
  lang: Locale
): { entry: RawPost; sourceLang: Locale } | undefined {
  const order: Locale[] = [lang, defaultLocale, ...locales];
  for (const candidate of order) {
    const entry = byLocale.get(candidate);
    if (entry) return { entry, sourceLang: candidate };
  }
  return undefined;
}

function isDraft(entry: RawPost): boolean {
  return Boolean((entry.data as { draft?: boolean }).draft);
}

/** Rough word count that strips the obvious Markdown noise before measuring. */
function plainTextOf(entry: RawPost): string {
  const body = (entry as { body?: string }).body ?? '';
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[>*_~|-]+/g, ' ')
    .trim();
}

function toPostEntry(
  slug: string,
  byLocale: Map<Locale, RawPost>,
  lang: Locale
): PostEntry | undefined {
  const picked = pickTranslation(byLocale, lang);
  if (!picked) return undefined;
  const { entry, sourceLang } = picked;
  const data = entry.data;

  const text = plainTextOf(entry);
  const computedReadingTime = data.readingTime ?? estimateReadingTime(text);

  const entryLocales = [...byLocale.keys()];

  return {
    slug,
    lang: sourceLang,
    requestedLang: lang,
    isFallback: sourceLang !== lang,
    translations: locales.filter((l) => entryLocales.includes(l)),
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    tags: data.tags ?? [],
    category: (data.category ?? 'notes') as PostCategory,
    featured: Boolean(data.featured),
    cover: data.cover,
    coverAlt: data.coverAlt,
    readingTime: computedReadingTime,
    path: `/writing/${slug}`,
    entry,
  };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                 */
/* -------------------------------------------------------------------------- */

/** All posts for a locale (falling back to English), newest first. */
export async function getAllPosts(lang: Locale, options: PostsOptions = {}): Promise<PostEntry[]> {
  const { includeDrafts = import.meta.env.DEV, limit } = options;
  const index = await loadIndex();
  const posts: PostEntry[] = [];

  for (const [slug, byLocale] of index) {
    const picked = pickTranslation(byLocale, lang);
    if (!picked || (!includeDrafts && isDraft(picked.entry))) continue;
    const post = toPostEntry(slug, byLocale, lang);
    if (post) posts.push(post);
  }

  posts.sort((a, b) => {
    const delta = b.date.getTime() - a.date.getTime();
    return delta === 0 ? a.slug.localeCompare(b.slug) : delta;
  });

  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
}

/** Latest N posts — convenience for the home page and “continue reading” blocks. */
export function getRecentPosts(lang: Locale, limit = 8): Promise<PostEntry[]> {
  return getAllPosts(lang, { limit });
}

/** One post by slug, fallback included. */
export async function getPostBySlug(lang: Locale, slug: string): Promise<PostEntry | undefined> {
  const index = await loadIndex();
  const byLocale = index.get(slug);
  if (!byLocale) return undefined;
  const picked = pickTranslation(byLocale, lang);
  if (!picked) return undefined;
  if (isDraft(picked.entry) && !import.meta.env.DEV) return undefined;
  return toPostEntry(slug, byLocale, lang);
}

/** True when the requested locale has real content for this slug. */
export async function hasTranslation(lang: Locale, slug: string): Promise<boolean> {
  const index = await loadIndex();
  return Boolean(index.get(slug)?.get(lang));
}

/** Locales (out of the 6) that really have this post. */
export async function getPostTranslations(slug: string): Promise<Locale[]> {
  const index = await loadIndex();
  const byLocale = index.get(slug);
  if (!byLocale) return [];
  return locales.filter((l) => byLocale.has(l));
}

/** All slugs, for getStaticPaths. */
export async function getAllPostSlugs(): Promise<string[]> {
  const index = await loadIndex();
  return [...index.keys()].sort();
}

/** Tags for a locale, most used first, with a representative localized label. */
export async function getAllTags(lang: Locale): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts(lang);
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Posts sharing a tag, newest first. */
export async function getPostsByTag(lang: Locale, tag: string): Promise<PostEntry[]> {
  const posts = await getAllPosts(lang);
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

/**
 * Related posts: same category first, then shared tags. Deterministic so the
 * build output is stable.
 */
export async function getRelatedPosts(
  lang: Locale,
  post: PostEntry,
  limit = 3
): Promise<PostEntry[]> {
  const posts = (await getAllPosts(lang)).filter((candidate) => candidate.slug !== post.slug);
  const scored = posts.map((candidate) => {
    const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
    const sameCategory = candidate.category === post.category ? 1 : 0;
    return { post: candidate, score: sharedTags * 2 + sameCategory };
  });
  scored.sort((a, b) => b.score - a.score || b.post.date.getTime() - a.post.date.getTime());
  return scored.slice(0, limit).map((item) => item.post);
}

/** Previous / next post in reverse-chronological order (older / newer). */
export async function getAdjacentPosts(
  lang: Locale,
  slug: string
): Promise<{ newer?: PostEntry; older?: PostEntry }> {
  const posts = await getAllPosts(lang);
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

export interface PageResult<T> {
  items: T[];
  /** 1-based page number (clamped to the available range). */
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

/** Slice any list into an 8-per-page page result, clamping out-of-range pages. */
export function paginate<T>(items: T[], page = 1, pageSize = POSTS_PAGE_SIZE): PageResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };
}

/** Paginated posts for one locale — the writing index pages use this. */
export async function getPaginatedPosts(
  lang: Locale,
  page = 1,
  pageSize = POSTS_PAGE_SIZE
): Promise<PageResult<PostEntry>> {
  const posts = await getAllPosts(lang);
  return paginate(posts, page, pageSize);
}

/** Locale-free href of a writing index page: page 1 is `/writing`, page 2 is `/writing/2`. */
export function writingPagePath(page: number, slug?: string): string {
  if (slug) return `/writing/${slug}`;
  return page <= 1 ? '/writing' : `/writing/${page}`;
}

/* -------------------------------------------------------------------------- */
/* Rendering                                                                  */
/* -------------------------------------------------------------------------- */

export interface RenderedPost {
  Content: Awaited<ReturnType<typeof renderContentEntry>>['Content'];
  headings: Awaited<ReturnType<typeof renderContentEntry>>['headings'];
  remarkPluginFrontmatter: Awaited<ReturnType<typeof renderContentEntry>>['remarkPluginFrontmatter'];
}

/** Render a post's MDX body (the Astro `render()` helper). */
export async function renderPost(post: PostEntry): Promise<RenderedPost> {
  return renderContentEntry(post.entry as never);
}
