import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { locales } from './i18n/config';

/**
 * Multilingual content convention:
 *   src/content/posts/<locale>/<slug>.mdx
 *   src/content/projects/<locale>/<slug>.mdx
 *
 * The collection id is therefore `<locale>/<slug>`. Missing translations fall
 * back to the default locale (handled in src/lib/content.ts).
 */
const localeEnum = z.enum(locales);

/**
 * Collection ids are always the path-based `<locale>/<slug>`. We pass an
 * explicit `generateId` because the glob loader otherwise prefers a frontmatter
 * `slug` field, which would collapse same-slug translations into one id.
 */
const stableId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx)$/, '');

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    generateId: stableId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: localeEnum.optional(),
    /** Same slug across locales links translations together. */
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['design', 'engineering', 'life', 'notes', 'work', 'tennis']).default('notes'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    year: z.number(),
    date: z.coerce.date().optional(),
    role: z.string(),
    team: z.string().optional(),
    status: z.enum(['live', 'shipped', 'in-progress', 'archived', 'concept']).default('shipped'),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        case: z.string().url().optional(),
      })
      .optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/**
 * Guides — the Chinese foreign-trade knowledge cluster (hub & spokes).
 * Deliberately zh-only: the notes/guides are written for a Chinese audience and
 * are not translated (their pages emit zh-CN + x-default hreflang only).
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    keywords: z.array(z.string()).default([]),
    order: z.number().default(99),
    summary: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects, guides };
