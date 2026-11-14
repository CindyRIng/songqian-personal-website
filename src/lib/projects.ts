/**
 * Project collection helpers.
 *
 * Content lives in `src/content/projects/<locale>/<slug>.mdx`; the collection id
 * is therefore `<locale>/<slug>`. This module is the single read API used by the
 * projects index, the project detail page and the home page. It:
 *
 *   1. prefers the requested locale and gracefully falls back to English,
 *   2. dedupes by slug so each project appears exactly once,
 *   3. exposes `hasTranslation` so UI can quietly note when English is shown.
 *
 * Covers are NOT files: every project cover is generated deterministically from
 * `coverSeed` (see src/components/projects/CoverArt.astro) so the site ships
 * zero stock imagery. To use a real image later, add `cover`/`gallery` paths to
 * the MDX frontmatter and swap the component call site for an <Image>.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, isLocale, type Locale } from '../i18n/config';

export type ProjectStatus = 'live' | 'shipped' | 'in-progress' | 'archived' | 'concept';

export type CollectionProject = CollectionEntry<'projects'>;

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
  case?: string;
}

/** A locale-resolved project, ready to render. */
export interface ProjectEntry {
  /** Locale-free slug, shared by every translation. */
  slug: string;
  /** Locale of the content actually loaded (falls back to `en`). */
  lang: Locale;
  /** True when the requested locale had its own translation. */
  hasTranslation: boolean;
  title: string;
  tagline: string;
  description: string;
  year: number;
  role: string;
  team?: string;
  status: ProjectStatus;
  tags: string[];
  stack: string[];
  metrics: ProjectMetric[];
  links?: ProjectLinks;
  featured: boolean;
  order: number;
  /** Deterministic seed for the generated CSS/SVG cover art. */
  coverSeed: string;
  /** Raw collection entry — needed by detail pages to render the MDX body. */
  entry: CollectionProject;
}

/**
 * Editorial categories used by the filter chips on the projects index.
 * A project opts into a category by listing it in its frontmatter `tags`.
 */
export const PROJECT_CATEGORIES = ['product', 'design-system', 'tool', 'experiment'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** Localized labels for the category chips (kept beside the data, not in ui.ts). */
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, Record<Locale, string>> = {
  product: { en: 'Product', zh: '产品', ja: 'プロダクト', es: 'Producto', fr: 'Produit', de: 'Produkt' },
  'design-system': {
    en: 'Design systems',
    zh: '设计系统',
    ja: 'デザインシステム',
    es: 'Sistemas de diseño',
    fr: 'Design systems',
    de: 'Designsysteme',
  },
  tool: { en: 'Tools', zh: '工具', ja: 'ツール', es: 'Herramientas', fr: 'Outils', de: 'Werkzeuge' },
  experiment: {
    en: 'Experiments',
    zh: '实验',
    ja: '実験',
    es: 'Experimentos',
    fr: 'Expériences',
    de: 'Experimente',
  },
};

/** ui.ts translation keys for each project status. */
export const PROJECT_STATUS_KEYS = {
  live: 'status.live',
  shipped: 'status.shipped',
  'in-progress': 'status.inProgress',
  archived: 'status.archived',
  concept: 'status.concept',
} as const;

/** Split a collection id (`<locale>/<slug>`) into its parts, defensively. */
function splitId(id: string): { lang: Locale; slug: string } {
  const parts = id.split('/');
  const first = parts[0];
  if (isLocale(first)) {
    return { lang: first, slug: parts.slice(1).join('/') };
  }
  return { lang: defaultLocale, slug: id };
}

function toEntry(entry: CollectionProject, lang: Locale): ProjectEntry {
  const data = entry.data;
  const { slug } = splitId(entry.id);
  return {
    slug,
    lang,
    hasTranslation: splitId(entry.id).lang === lang,
    title: data.title,
    tagline: data.tagline,
    description: data.description,
    year: data.year,
    role: data.role,
    team: data.team,
    status: data.status,
    tags: data.tags,
    stack: data.stack,
    metrics: data.metrics,
    links: data.links,
    featured: data.featured,
    order: data.order,
    coverSeed: data.cover ?? `generated:${slug}`,
    entry,
  };
}

/** Sort: editorial `order` first (asc), then newest year, then slug. */
function byOrder(a: ProjectEntry, b: ProjectEntry): number {
  if (a.order !== b.order) return a.order - b.order;
  if (a.year !== b.year) return b.year - a.year;
  return a.slug.localeCompare(b.slug);
}

/**
 * All projects resolved for one locale, ordered for the index page.
 * Prefers `<lang>/<slug>`, falls back to `<defaultLocale>/<slug>`, dedupes by slug.
 */
export async function getLocalizedProjects(lang: Locale): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', (entry) => !entry.data.draft);
  const bySlug = new Map<string, { entry: CollectionProject; contentLang: Locale }>();

  for (const entry of entries) {
    const { lang: contentLang, slug } = splitId(entry.id);
    const existing = bySlug.get(slug);
    if (!existing) {
      bySlug.set(slug, { entry, contentLang });
      continue;
    }
    // Prefer the requested locale, then English.
    const rank = (l: Locale) => (l === lang ? 0 : l === defaultLocale ? 1 : 2);
    if (rank(contentLang) < rank(existing.contentLang)) {
      bySlug.set(slug, { entry, contentLang });
    }
  }

  return [...bySlug.values()]
    .map(({ entry, contentLang }) => toEntry(entry, contentLang === lang ? lang : contentLang))
    .sort(byOrder);
}

/** Featured projects — used by the home page's "Selected work" section. */
export async function getFeaturedProjects(lang: Locale, limit = 2): Promise<ProjectEntry[]> {
  const projects = await getLocalizedProjects(lang);
  return projects.filter((project) => project.featured).slice(0, limit);
}

/** Sibling projects for the detail page footer ("Next project"). */
export async function getProjectNeighbors(
  lang: Locale,
  slug: string
): Promise<{ next: ProjectEntry; prev: ProjectEntry } | null> {
  const projects = await getLocalizedProjects(lang);
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  return { next, prev };
}

/** One project resolved for a locale, or null when the slug does not exist. */
export async function getProjectBySlug(lang: Locale, slug: string): Promise<ProjectEntry | null> {
  const projects = await getLocalizedProjects(lang);
  return projects.find((project) => project.slug === slug) ?? null;
}

/** Every locale-free project slug — powers getStaticPaths. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const entries = await getCollection('projects', (entry) => !entry.data.draft);
  return [...new Set(entries.map((entry) => splitId(entry.id).slug))].sort();
}

/** Categories a project belongs to (intersection of frontmatter tags and known chips). */
export function projectCategories(project: ProjectEntry): ProjectCategory[] {
  return PROJECT_CATEGORIES.filter((category) => project.tags.includes(category));
}

/** Count projects per category, for quiet chip counts. */
export function countByCategory(projects: ProjectEntry[]): Record<ProjectCategory, number> {
  const counts = Object.fromEntries(PROJECT_CATEGORIES.map((category) => [category, 0])) as Record<
    ProjectCategory,
    number
  >;
  for (const project of projects) {
    for (const category of projectCategories(project)) counts[category] += 1;
  }
  return counts;
}
