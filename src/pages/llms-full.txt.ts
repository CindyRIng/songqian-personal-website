/**
 * /llms-full.txt — the full text of every essay and case study (both languages)
 * for retrieval-augmented assistants that prefer complete documents over
 * summaries. Plain text, stable URLs, no client-side rendering required.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { glossaryGroups, glossaryUpdated } from '../data/glossary';
import { SITE } from '../i18n/config';
import { notes } from '../data/notes';
import { now } from '../data/now';
import { books } from '../data/reading';

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

  out.push('# 笔记 Notes', '');
  for (const note of notes) {
    out.push(`## ${note.date}`);
    out.push('');
    out.push(note.text);
    if (note.tags?.length) out.push('', `Tags: ${note.tags.join(', ')}`);
    out.push('');
  }

  out.push('# 现在 Now', '');
  out.push(`Updated: ${now.updated}`);
  out.push('');
  for (const section of now.sections) {
    out.push(`## ${section.label.zh} / ${section.label.en}`);
    out.push('');
    for (const item of section.items) {
      out.push(`- ${item.zh}`);
      if (item.en) out.push(`  ${item.en}`);
    }
    out.push('');
  }

  out.push('# 书桌 Reading', '');
  for (const book of books) {
    out.push(`## ${book.title} — ${book.author}`);
    out.push('');
    out.push(`Status: ${book.status}${book.year ? ` · ${book.year}` : ''}${book.hours ? ` · ${book.hours}` : ''}${book.progress ? ` · ${book.progress}` : ''}`);
    out.push('');
    out.push(book.note);
    out.push('');
  }

  const tradeGuides = (await getCollection('guides', ({ data }) => !data.draft)).sort((a, b) => a.data.order - b.data.order);
  out.push('# 外贸指南 Foreign trade guides', '');
  for (const guide of tradeGuides) {
    out.push(`## ${guide.data.title}`);
    out.push('');
    out.push(`URL: ${url(`/foreign-trade/${guide.id}/`)}`);
    out.push(`Updated: ${guide.data.updated.toISOString().slice(0, 10)}`);
    out.push(`Keywords: ${guide.data.keywords.join(', ')}`);
    out.push('');
    out.push(guide.data.description);
    out.push('');
    if (guide.data.summary.length) {
      for (const point of guide.data.summary) out.push(`- ${point}`);
      out.push('');
    }
    out.push(toPlain(guide.body ?? ''));
    out.push('');
    if (guide.data.faqs.length) {
      for (const faq of guide.data.faqs) {
        out.push(`Q: ${faq.q}`);
        out.push(`A: ${faq.a}`);
        out.push('');
      }
    }
  }

  out.push('# 外贸术语表 / Glossary', '');
  out.push(`URL: ${url('/foreign-trade/glossary/')} · Updated: ${glossaryUpdated}`);
  out.push('');
  for (const group of glossaryGroups) {
    out.push(`## ${group.label} / ${group.en}`, '');
    out.push(group.intro, '');
    for (const term of group.terms) {
      out.push(`- **${term.term}** (${term.en}): ${term.definition}`);
    }
    out.push('');
  }

  out.push('# 外贸咨询 / Consulting', '');
  out.push(`URL: ${url('/consulting/')}`);
  out.push('');
  out.push('宋谦以个人身份提供外贸获客诊断、客户管理系统落地、外贸团队培训；不卖软件、不拿返点，软件采购走官方渠道。服务对象：刚组建的外贸团队、有询盘但转化率低的企业、准备上 CRM 或展会前的团队。');
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
