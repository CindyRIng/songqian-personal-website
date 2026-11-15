/**
 * TIMELINE — the chronological spine (Timeline page + home strip + About CV).
 *
 * `start`/`end` are `YYYY-MM` strings, `end: null` means "Present". The array
 * is newest-first; `getTimeline()` sorts defensively. Only the entries marked
 * `cv: true` appear in the About page's short CV ledger.
 */
import type { L } from './profile';
import type { Locale } from '../i18n/config';
import { formatMonth, useTranslations } from '../i18n/utils';

export const TIMELINE_TYPE_KEYS = {
  work: 'timeline.type.work',
  education: 'timeline.type.education',
  milestone: 'timeline.type.milestone',
  life: 'timeline.type.life',
} as const;

export type TimelineType = keyof typeof TIMELINE_TYPE_KEYS;

export const TIMELINE_TYPES: TimelineType[] = ['work', 'education', 'milestone', 'life'];

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  start: string;
  end: string | null;
  org: L;
  role: L;
  summary: L;
  location?: L;
  tags?: string[];
  link?: string;
  /** Show this entry in the About page's short CV ledger. */
  cv?: boolean;
}

export interface ResolvedTimelineEntry {
  id: string;
  type: TimelineType;
  start: string;
  end: string | null;
  year: number;
  startLabel: string;
  endLabel: string;
  period: string;
  current: boolean;
  org: string;
  role: string;
  summary: string;
  location?: string;
  tags: string[];
  link?: string;
}

const LOC: L = { zh: '石家庄，中国', en: 'Shijiazhuang, China' };

export const timeline: TimelineEntry[] = [
  {
    id: 'site-launch',
    type: 'milestone',
    start: '2026-11',
    end: null,
    org: { zh: '个人网站', en: 'Personal site' },
    role: { zh: '设计与开发', en: 'Design & development' },
    summary: {
      zh: '把这个站从头重做了一遍：中英双语、客户端路由、纸墨版式，全部手写。',
      en: 'Rebuilt this site from scratch: Chinese + English, client-side routing, a paper-and-ink layout, all by hand.',
    },
    location: LOC,
    tags: ['Astro', 'TypeScript', 'Design'],
  },
  {
    id: 'canton-fair-sop',
    type: 'work',
    start: '2026-10',
    end: '2026-10',
    org: { zh: '孚盟软件', en: 'Fumamx' },
    role: { zh: '客户经理', en: 'Account manager' },
    summary: {
      zh: '把广交会的展会销售拆成可执行的 SOP、话术树和考核标准。',
      en: 'Broke the Canton Fair sales process into executable SOPs, a call tree and an assessment standard.',
    },
    location: LOC,
    tags: ['Sales', 'SOP'],
  },
  {
    id: 'sales-toolchain',
    type: 'work',
    start: '2026-08',
    end: null,
    org: { zh: '独立项目', en: 'Independent' },
    role: { zh: '设计与开发', en: 'Design & development' },
    summary: {
      zh: '孚盟本地封装平台、飞鸽外呼平台，以及 BOSS／智联／探迹的本地客户端——把销售的重复劳动变成可编程接口。',
      en: 'A local Fumamx platform, an outbound-calling platform, and local clients for BOSS, Zhaopin and Tanji — repetitive sales work turned into programmable interfaces.',
    },
    location: LOC,
    tags: ['TypeScript', 'MCP', 'Automation'],
  },
  {
    id: 'fumamx-account-manager',
    type: 'work',
    start: '2026-07',
    end: null,
    cv: true,
    org: { zh: '孚盟软件', en: 'Fumamx' },
    role: { zh: '客户经理', en: 'Account manager' },
    summary: {
      zh: '加入孚盟软件做外贸 SaaS 的客户经理：每天离客户最近，也离重复劳动最近。',
      en: 'Joined Fumamx as an account manager for foreign-trade SaaS — the closest seat to customers, and to repetitive work.',
    },
    location: LOC,
    tags: ['Sales', 'SaaS'],
  },
  {
    id: 'graduation',
    type: 'milestone',
    start: '2026-06',
    end: '2026-06',
    org: { zh: '河北工程技术学院', en: 'Hebei University of Engineering Technology' },
    role: { zh: '物联网工程 · 学士', en: 'B.Eng. Internet of Things Engineering' },
    summary: {
      zh: '本科毕业。四年里做过网球社社长、写过十余部社团条例，也做完了一台捡球机器人。',
      en: 'Graduated. In four years I ran a tennis club, wrote ten-plus club regulations and finished a ball-collecting robot.',
    },
    location: LOC,
    tags: ['Graduation'],
  },
  {
    id: 'sales-team-experiment',
    type: 'milestone',
    start: '2026-06',
    end: '2026-06',
    org: { zh: '三人销售小组', en: 'Three-person sales team' },
    role: { zh: '销售与方案', en: 'Sales & solutions' },
    summary: {
      zh: '和两个伙伴做了一次小规模销售创业实验：选品、找客户、做报价。两个月后，各自回到更合适的路径。',
      en: 'A short three-person sales experiment: picking products, finding customers, quoting. Two months later we each chose a better-fitting path.',
    },
    location: LOC,
    tags: ['Startup', 'Sales'],
  },
  {
    id: 'korea-partnership',
    type: 'milestone',
    start: '2026-05',
    end: '2026-05',
    org: { zh: '国际教育合作项目', en: 'International education project' },
    role: { zh: '项目推进', en: 'Project lead' },
    summary: {
      zh: '参与韩国高校来访合作：接待、方案、翻译与后续落地推进。',
      en: 'Helped host a Korean university delegation: reception, proposals, translation and follow-up.',
    },
    location: LOC,
    tags: ['Partnership'],
  },
  {
    id: 'ai-implementation-intern',
    type: 'work',
    start: '2026-03',
    end: '2026-07',
    cv: true,
    org: { zh: '燕山华云', en: 'Yanshan Huayun' },
    role: { zh: 'AI 实施实习生', en: 'AI implementation intern' },
    summary: {
      zh: '做招聘中枢的产品设计、企业 AI 基建选型，给客户做培训和售前方案。确认了一件事：企业缺的不是模型，是把模型接进流程的人。',
      en: 'Product design for a recruiting hub, AI infrastructure selection, customer training and pre-sales. Confirmed one thing: companies lack not models but people who wire them into processes.',
    },
    location: LOC,
    tags: ['AI', 'Product', 'Pre-sales'],
  },
  {
    id: 'thesis-robot',
    type: 'education',
    start: '2025-11',
    end: '2026-05',
    org: { zh: '河北工程技术学院', en: 'Hebei University of Engineering Technology' },
    role: { zh: '毕业设计 · 独立开发', en: 'Thesis · solo developer' },
    summary: {
      zh: '网球捡球机器人：五层架构、两轮差速底盘、滚筒式拾球机构与 3D 打印结构。',
      en: 'A tennis-ball-collecting robot: five-layer architecture, differential drive, roller pickup mechanism and 3D-printed structure.',
    },
    location: LOC,
    tags: ['ROS', 'Embedded', '3D Printing'],
  },
  {
    id: 'reimbursement-system',
    type: 'work',
    start: '2025-08',
    end: '2025-08',
    org: { zh: '校园项目', en: 'Campus project' },
    role: { zh: '设计与开发', en: 'Design & development' },
    summary: {
      zh: '用智能表单搭了一套线上报销审批系统，把纸质流程搬到线上。',
      en: 'Built an online reimbursement approval system with smart forms, moving a paper process online.',
    },
    location: LOC,
    tags: ['Low-code', 'Automation'],
  },
  {
    id: 'tennis-club-president',
    type: 'milestone',
    start: '2025-06',
    end: '2025-10',
    cv: true,
    org: { zh: '河工网球社', en: 'Tennis Club' },
    role: { zh: '社长', en: 'President' },
    summary: {
      zh: '带社团从人治走向制度：写下章程与十余部条例，建立训练方案、纳新与交接流程。',
      en: 'Moved the club from personality-driven to rule-based: wrote a constitution and ten-plus regulations, built training, recruitment and handover processes.',
    },
    location: LOC,
    tags: ['Leadership', 'Community'],
  },
  {
    id: 'knowledge-system',
    type: 'life',
    start: '2025-05',
    end: null,
    org: { zh: '个人系统', en: 'Personal system' },
    role: { zh: '写作者', en: 'Writer' },
    summary: {
      zh: '开始用纯文本与双链管理知识：日记、周复盘、原则系统，并把经验写成文章。',
      en: 'Started managing knowledge in plain text and backlinks: diary, weekly reviews, a principles system, and turning experience into essays.',
    },
    location: LOC,
    tags: ['Writing', 'PKM'],
  },
  {
    id: 'university-start',
    type: 'education',
    start: '2022-09',
    end: '2026-06',
    cv: true,
    org: { zh: '河北工程技术学院', en: 'Hebei University of Engineering Technology' },
    role: { zh: '物联网工程 · 本科', en: 'B.Eng. Internet of Things Engineering' },
    summary: {
      zh: '从硬件到软件都学了一遍；真正留下来的，是对系统的兴趣和一套自己的学习方式。',
      en: 'Studied both hardware and software; what stayed was an interest in systems and a way of learning that is my own.',
    },
    location: LOC,
    tags: ['IoT', 'Computer Science'],
  },
  {
    id: 'tennis-journey',
    type: 'life',
    start: '2022-09',
    end: null,
    org: { zh: '网球', en: 'Tennis' },
    role: { zh: '长期练习者', en: 'Long-term player' },
    summary: {
      zh: '从大一开始系统训练，最长的一次坚持：每周两到三次，相信慢反馈。',
      en: 'Started systematic training in freshman year — two to three sessions a week, and a belief in slow feedback.',
    },
    location: LOC,
    tags: ['Tennis', 'Habit'],
  },
];

/** The five nodes shown in the home page strip, chronological. */
export const homeMilestones = [
  'university-start',
  'tennis-club-president',
  'ai-implementation-intern',
  'fumamx-account-manager',
  'sales-toolchain',
] as const;

function monthValue(value: string): number {
  const [year, month] = value.split('-');
  return Number(year) * 100 + Number(month ?? 1);
}

function pick(value: L, lang: Locale): string {
  return value[lang] ?? value.zh ?? value.en;
}

export function getTimeline(lang: Locale): ResolvedTimelineEntry[] {
  const t = useTranslations(lang);
  const present = t('common.present');

  return [...timeline]
    .sort((a, b) => monthValue(b.start) - monthValue(a.start))
    .map((entry) => {
      const startLabel = formatMonth(entry.start, lang);
      const endLabel = entry.end ? formatMonth(entry.end, lang) : present;
      const period =
        entry.end === null
          ? `${startLabel} — ${present}`
          : entry.end === entry.start
            ? startLabel
            : `${startLabel} — ${endLabel}`;

      return {
        id: entry.id,
        type: entry.type,
        start: entry.start,
        end: entry.end,
        year: Number(entry.start.slice(0, 4)),
        startLabel,
        endLabel,
        period,
        current: entry.end === null,
        org: pick(entry.org, lang),
        role: pick(entry.role, lang),
        summary: pick(entry.summary, lang),
        location: entry.location ? pick(entry.location, lang) : undefined,
        tags: entry.tags ?? [],
        link: entry.link,
      };
    });
}

export interface TimelineYearGroup {
  year: number;
  entries: ResolvedTimelineEntry[];
}

/** Group resolved entries by start year, preserving newest-first order. */
export function groupTimelineByYear(entries: ResolvedTimelineEntry[]): TimelineYearGroup[] {
  const groups: TimelineYearGroup[] = [];
  for (const entry of entries) {
    const current = groups[groups.length - 1];
    if (current && current.year === entry.year) current.entries.push(entry);
    else groups.push({ year: entry.year, entries: [entry] });
  }
  return groups;
}

/** Integer count of entries per type — used by the quiet filter labels. */
export function countTimelineByType(entries: ResolvedTimelineEntry[]): Record<TimelineType, number> {
  const counts = { work: 0, education: 0, milestone: 0, life: 0 } as Record<TimelineType, number>;
  for (const entry of entries) counts[entry.type] += 1;
  return counts;
}
