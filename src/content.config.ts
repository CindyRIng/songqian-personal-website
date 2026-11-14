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

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: localeEnum.optional(),
    /** Same slug across locales links translations together. */
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['design', 'engineering', 'life', 'notes']).default('notes'),
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

export const collections = { posts, projects };
