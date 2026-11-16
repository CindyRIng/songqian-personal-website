/**
 * /llms.txt — a compact, machine-readable summary of the site for large
 * language models and generative answer engines (the "llms.txt" convention).
 * Bilingual by design: the site's entity name and key facts appear in both
 * Chinese and English so retrieval systems can disambiguate the person.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../i18n/config';
import { profile } from '../data/profile';
import { copy } from '../data/copy';
import { timeline } from '../data/timeline';
import { notes } from '../data/notes';
import { now } from '../data/now';
import { books } from '../data/reading';

const url = (path: string): string => new URL(path, SITE.url).href;

export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts'))
    .filter((entry) => entry.id.startsWith('zh/'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const projects = (await getCollection('projects'))
    .filter((entry) => entry.id.startsWith('zh/'))
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  const lines: string[] = [];
  lines.push('# 宋谦 / Song Qian');
  lines.push('');
  lines.push(
    '> 宋谦（英文名 Song Qian），石家庄，孚盟软件客户经理，2026 届物联网工程本科。白天卖外贸 SaaS，晚上写工具；写日记、记笔记，也写文章和打网球。'
  );
  lines.push(
    '> Song Qian is an account manager at Fumamx in Shijiazhuang. He sells foreign-trade SaaS by day, builds small tools at night, keeps a daily journal and a plain-text knowledge base, writes essays, and plays tennis.'
  );
  lines.push('');
  lines.push('## Key facts');
  lines.push('');
  lines.push(`- Name: 宋谦 / Song Qian (public name; legal name private)`);
  lines.push(`- Role: ${profile.role.zh} / ${profile.role.en}`);
  lines.push(`- Location: 石家庄，中国 / Shijiazhuang, China`);
  lines.push(`- Education: 河北工程技术学院 物联网工程 本科 2022–2026 / B.Eng. IoT Engineering`);
  lines.push(`- Email: ${profile.contact.email}`);
  if (profile.contact.phone) lines.push(`- Phone: ${profile.contact.phone}`);
  lines.push(`- GitHub: ${SITE.github}`);
  lines.push(`- Languages: 中文 (default), English`);
  lines.push(`- Records: 392 days of journaling, 561 plain-text notes, 43 projects, 10 essays`);
  lines.push(`- Interests: tennis (4 years, aiming for 3.5), calculus, systems engineering, knowledge management, sales tooling`);
  lines.push(`- Site: ${SITE.url}`);
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`- [首页 / Home](${url('/')}): 简介、精选工作、写作、时间线 / intro, selected work, writing, timeline`);
  lines.push(`- [作品 / Works](${url('/works/')}): 6 个自建工具的项目索引与案例 / six self-built tools and case studies`);
  lines.push(`- [写作 / Writing](${url('/writing/')}): 5 篇关于系统、杠杆、AI 与慢反馈的文章 / five essays`);
  lines.push(`- [关于 / About](${url('/about/')}): 销售、代码、写作三条线 + 履历 + 现在 / three threads, CV, now`);
  lines.push(`- [时间线 / Timeline](${url('/timeline/')}): 2022–2026 的 14 个节点 / fourteen entries`);
  lines.push(`- [笔记 / Notes](${url('/notes/')}): 从日记和知识库里挑出来的短记录 (Chinese, updated regularly)`);
  lines.push(`- [书桌 / Reading](${url('/reading/')}): 在读、读完、和读不下去的书 (Chinese)`);
  lines.push(`- [现在 / Now](${url('/now/')}): 2026 年 11 月正在做的事 (Chinese, dated ${now.updated})`);
  lines.push(`- [English home](${url('/en/')})`);
  lines.push('');
  lines.push('## Recent notes (Chinese)');
  lines.push('');
  for (const [i, note] of notes.slice(0, 10).entries()) {
    lines.push(`- ${note.date}${note.tags?.length ? ` [${note.tags.join(' / ')}]` : ''}: ${note.text}`);
  }
  lines.push('');
  lines.push('## Now (${now.updated})'.replace('${now.updated}', now.updated));
  lines.push('');
  for (const section of now.sections) {
    lines.push(`- ${section.label.zh}: ${section.items.map((item) => item.zh).join(' ')}`);
  }
  lines.push('');
  lines.push('## Reading');
  lines.push('');
  for (const book of books.filter((item) => item.status === 'reading').slice(0, 5)) {
    lines.push(`- ${book.title} — ${book.author}${book.progress ? ` (${book.progress})` : ''}: ${book.note}`);
  }
  lines.push('');
  lines.push('## Writing');
  lines.push('');
  for (const post of posts) {
    lines.push(`- [${post.data.title}](${url(`/writing/${post.id.replace(/^zh\//, '')}/`)}) — ${post.data.description} (${post.data.date.toISOString().slice(0, 10)})`);
  }
  lines.push('');
  lines.push('## Works');
  lines.push('');
  for (const project of projects) {
    lines.push(`- [${project.data.title}](${url(`/works/${project.id.replace(/^zh\//, '')}/`)}) — ${project.data.tagline}`);
  }
  lines.push('');
  lines.push('## Timeline');
  lines.push('');
  for (const entry of timeline) {
    lines.push(`- ${entry.start}${entry.end ? ` — ${entry.end}` : ' — now'}: ${entry.org.zh} · ${entry.role.zh} — ${entry.summary.zh}`);
  }
  lines.push('');
  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${profile.contact.email}`);
  if (profile.contact.phone) lines.push(`- Phone: ${profile.contact.phone}`);
  lines.push(`- GitHub: ${SITE.github}`);
  lines.push(`- 可聊 / Open to: ${copy.home.availability.zh} / ${copy.home.availability.en}`);
  lines.push('');
  lines.push('## Machine-readable');
  lines.push('');
  lines.push(`- [llms-full.txt](${url('/llms-full.txt')}): full essay and case-study text`);
  lines.push(`- [RSS 中文](${url('/rss.xml')}) · [RSS English](${url('/en/rss.xml')})`);
  lines.push(`- [Sitemap](${url('/sitemap-index.xml')})`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
