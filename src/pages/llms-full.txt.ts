/**
 * /llms-full.txt — the full text of every essay and case study (both languages)
 * for retrieval-augmented assistants that prefer complete documents over
 * summaries. Plain text, stable URLs, no client-side rendering required.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../i18n/config';

const url = (path: string): string => new URL(path, SITE.url).href;

/** Strip MDX/markdown syntax down to readable plain text. */
function toPlain(markdown: string): string {
  return markdown
    .replace(/^import\s.+$/gm, '')
    .replace(/^export\s.+$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = async () => {
  const out: string[] = [];
  out.push('# 宋谦 / Song Qian — full text');
  out.push('');
  out.push(`> Canonical site: ${SITE.url}`);
  out.push('');

  for (const locale of ['zh', 'en'] as const) {
    const heading = locale === 'zh' ? '# 中文全文' : '# English — full text';
    out.push(heading, '');

    const posts = (await getCollection('posts'))
      .filter((entry) => entry.id.startsWith(`${locale}/`))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    for (const post of posts) {
      const slug = post.id.replace(new RegExp(`^${locale}/`), '');
      out.push(`## ${post.data.title}`);
      out.push('');
      out.push(`URL: ${url(`/${locale === 'zh' ? '' : 'en/'}writing/${slug}/`)}`);
      out.push(`Date: ${post.data.date.toISOString().slice(0, 10)}`);
      out.push('');
      out.push(post.data.description);
      out.push('');
      out.push(toPlain(post.body ?? ''));
      out.push('');
    }

    const projects = (await getCollection('projects'))
      .filter((entry) => entry.id.startsWith(`${locale}/`))
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
    for (const project of projects) {
      const slug = project.id.replace(new RegExp(`^${locale}/`), '');
      out.push(`## Project: ${project.data.title}`);
      out.push('');
      out.push(`URL: ${url(`/${locale === 'zh' ? '' : 'en/'}works/${slug}/`)}`);
      out.push(`Year: ${project.data.year} · Role: ${project.data.role}`);
      out.push('');
      out.push(project.data.description);
      out.push('');
      out.push(toPlain(project.body ?? ''));
      out.push('');
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
