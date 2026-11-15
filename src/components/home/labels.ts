/**
 * Chrome labels for the A+ home page that are not (yet) part of
 * `src/data/copy.ts`: small structural furniture such as "速览 / At a glance"
 * or "PLATE I". Kept in one place so they can be promoted to copy.ts later
 * without touching component markup.
 */
import type { Locale } from '../../i18n/config';

const table = {
  factsTitle: { zh: '速览', en: 'At a glance' },
  factsIndex: { zh: '00', en: '00' },
  lastUpdated: { zh: '最后更新', en: 'Last updated' },
  moreTools: { zh: '其余工具', en: 'More tools' },
  selectedTools: { zh: '个工具', en: 'tools' },
  plateTitle: { zh: '复利', en: 'Compounding' },
  workView: { zh: '项目详情', en: 'View project' },
  writingFoot: { zh: '写于 2026，关于系统、杠杆与慢反馈。', en: 'Written in 2026 — on systems, leverage and slow feedback.' },
  readEssay: { zh: '阅读全文', en: 'Read essay' },
  read: { zh: '阅读', en: 'Read' },
} as const satisfies Record<string, { zh: string; en: string }>;

/** Post category → localized label (taxonomy lives in content frontmatter). */
const categories = {
  design: { zh: '设计', en: 'Design' },
  engineering: { zh: '工程', en: 'Engineering' },
  life: { zh: '生活', en: 'Life' },
  notes: { zh: '笔记', en: 'Notes' },
} as const;

export function categoryLabel(category: string, lang: Locale): string {
  const entry = (categories as Record<string, { zh: string; en: string }>)[category];
  return entry ? entry[lang] : category;
}

export function chromeLabel(key: keyof typeof table, lang: Locale): string {
  return table[key][lang];
}

/** "工作 / Works" style bilingual label, primary locale first. */
export function bilingual(zh: string, en: string, lang: Locale): string {
  return lang === 'zh' ? `${zh} / ${en}` : `${en} / ${zh}`;
}

/** Primary + secondary split, for two-weight labels. */
export function bilingualPair(
  zh: string,
  en: string,
  lang: Locale
): { primary: string; secondary: string } {
  return lang === 'zh' ? { primary: zh, secondary: en } : { primary: en, secondary: zh };
}
