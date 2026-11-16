/**
 * TIMELINE — the chronological spine (Timeline page + home strip + About CV).
 *
 * `start`/`end` are `YYYY-MM` strings, `end: null` means "Present". The array
 * is newest-first; `getTimeline()` sorts defensively. Only the entries marked
 * `cv: true` appear in the About page's short CV ledger.
 *
 * V4: expanded to 22 entries from the Obsidian vault project log
 * (`Project/` docs, dated PJ files) and the diary milestones. No invented
 * facts; failed/cancelled projects are recorded as such (AgentOS, the
 * three-person sales team, the rolling course for a client that was cancelled
 * when I left Huayun).
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
    id: 'ai-livestream-sales',
    type: 'work',
    start: '2026-11',
    end: null,
    org: { zh: '孚盟软件', en: 'Fumamx' },
    role: { zh: '客户经理 · 自建销售系统', en: 'Account manager · self-built sales system' },
    summary: {
      zh: '销售系统又往前推了一步：探迹、BOSS 客户端已经能用，智联还差一半。11 月开始偶尔直播，讲外贸 AI 怎么接进业务流程。',
      en: 'The sales system moved forward again: the Tanji and BOSS clients work, Zhaopin is half done. In November I started occasional livestreams about how AI actually fits into foreign-trade workflows.',
    },
    location: LOC,
    tags: ['Sales', 'AI', 'Livestream'],
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
    id: 'training-course',
    type: 'work',
    start: '2026-07',
    end: '2026-07',
    org: { zh: '制造业 AI 培训', en: 'Manufacturing AI training' },
    role: { zh: '课程设计', en: 'Course design' },
    summary: {
      zh: '给一家制造企业准备 AI 培训：写大纲、做 PPT、准备试讲。7 月 27 日从华云离职，课最后没讲成。',
      en: 'Prepared an AI training course for a manufacturing company: outline, slides, a rehearsal. I left Huayun on 27 July and the course never ran.',
    },
    location: LOC,
    tags: ['AI', 'Training'],
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
    id: 'thesis-completed',
    type: 'education',
    start: '2026-06',
    end: '2026-06',
    cv: true,
    org: { zh: '河北工程技术学院', en: 'Hebei University of Engineering Technology' },
    role: { zh: '毕业设计', en: 'Thesis' },
    summary: {
      zh: '6 月 11 日交了毕业设计终稿：网球捡球机器人，五层架构、两轮差速底盘、滚筒拾球机构和 3D 打印结构。',
      en: 'Submitted the final thesis on 11 June: a tennis-ball-collecting robot with a five-layer architecture, differential drive, roller pickup and 3D-printed parts.',
    },
    location: LOC,
    tags: ['Thesis', 'ROS', '3D Printing'],
  },
  {
    id: 'sales-team-experiment',
    type: 'milestone',
    start: '2026-06',
    end: '2026-06',
    org: { zh: '三人销售小组', en: 'Three-person sales team' },
    role: { zh: '销售与方案', en: 'Sales & solutions' },
    summary: {
      zh: '和两个朋友凑了个销售小组。卖什么、谁负责什么都没定，就急着去找客户，一个夏天不到就散了。',
      en: 'Two friends and I started a sales team. We had not decided what we were selling or who owned what, but went looking for customers anyway. It fell apart within a summer.',
    },
    location: LOC,
    tags: ['Sales'],
  },
  {
    id: 'agentos',
    type: 'milestone',
    start: '2026-05',
    end: '2026-05',
    org: { zh: 'AgentOS', en: 'AgentOS' },
    role: { zh: '项目尝试', en: 'Project attempt' },
    summary: {
      zh: '想把公司内部的 Agent 做成一套能推广的系统，做了两周多、25 个小时，发现目标没说清，5 月 28 日取消。只留下命名规范和配置规范。',
      en: 'Tried to turn the company’s internal agents into a system that could be rolled out. Two-plus weeks and 25 hours in, the goal was still unclear; cancelled on 28 May. Only the naming and configuration specs survived.',
    },
    location: LOC,
    tags: ['AI', 'Agents'],
  },
  {
    id: 'korea-partnership',
    type: 'milestone',
    start: '2026-04',
    end: '2026-05',
    org: { zh: '韩国工大合作项目', en: 'Korean university partnership' },
    role: { zh: '项目推进', en: 'Project lead' },
    summary: {
      zh: '先给韩国工大做中文官网（4 月），5 月接待来访团，做方案、翻译和后续推进。',
      en: 'Built a Chinese-language website for a Korean engineering university in April, then hosted its delegation in May: proposals, translation and follow-up.',
    },
    location: LOC,
    tags: ['Partnership', 'Web'],
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
    id: 'tennis-3-5',
    type: 'life',
    start: '2026-02',
    end: null,
    org: { zh: '网球', en: 'Tennis' },
    role: { zh: '冲 3.5', en: 'Chasing 3.5' },
    summary: {
      zh: '给自己定了个目标：两场 Tennis123 3.5 单打冠军。做了六天一个循环的 PHASE1 训练计划，每周两三次，现在还在改底线和发球。',
      en: 'Set a goal: two Tennis123 3.5 singles titles. Built a six-day PHASE1 training cycle and play two or three times a week; still reworking the baseline and the toss.',
    },
    location: LOC,
    tags: ['Tennis', 'Training'],
  },
  {
    id: 'apostol',
    type: 'education',
    start: '2026-02',
    end: null,
    org: { zh: '自学', en: 'Self-study' },
    role: { zh: '微积分', en: 'Calculus' },
    summary: {
      zh: '开始读 Apostol《微积分》第一卷，记了 23 小时 15 分，还没读完。实变部分得自己在纸上推，推不动就停两天。',
      en: 'Started Apostol’s Calculus Vol. I — 23 hours and 15 minutes logged, still unfinished. The real-analysis parts only move if I redo the proofs on paper.',
    },
    location: LOC,
    tags: ['Math', 'Reading'],
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
    id: 'principles-system',
    type: 'life',
    start: '2025-10',
    end: '2025-10',
    org: { zh: '个人原则系统', en: 'Personal principles' },
    role: { zh: 'CP1–CP6', en: 'CP1–CP6' },
    summary: {
      zh: '写完六条个人原则 v1.0：精力优先、单通道专注、日记与复盘、输入节食、承诺边界、风险闸门。',
      en: 'Finished six personal principles v1.0: energy first, single-channel focus, diary and review, input diet, commitment boundaries, risk gate.',
    },
    location: LOC,
    tags: ['Systems', 'Writing'],
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
    id: 'diary-system',
    type: 'life',
    start: '2025-05',
    end: null,
    org: { zh: '日记与复盘', en: 'Diary and review' },
    role: { zh: '持续记录', en: 'Ongoing record' },
    summary: {
      zh: '5 月 29 日写了《为什么要写日记与怎样写日记》，之后基本每天都写，到现在 392 天。',
      en: 'On 29 May I wrote down why and how I keep a diary. I have written almost every day since — 392 days so far.',
    },
    location: LOC,
    tags: ['Diary', 'Systems'],
  },
  {
    id: 'systems-engineering',
    type: 'education',
    start: '2025-02',
    end: null,
    org: { zh: '自学', en: 'Self-study' },
    role: { zh: '系统工程', en: 'Systems engineering' },
    summary: {
      zh: '开始读《系统工程原则与实践》，中间停了大半年；做毕设时又捡起来，现在读到 156/661 页。',
      en: 'Started Systems Engineering Principles and Practice, stopped for most of a year, picked it up again for the thesis. Now on page 156 of 661.',
    },
    location: LOC,
    tags: ['Systems', 'Reading', 'Thesis'],
  },
  {
    id: 'university-start',
    type: 'education',
    start: '2022-09',
    end: '2026-06',
    cv: true,
    org: { zh: '河北工程技术学院', en: 'Hebei University of Engineering Technology' },
    role: { zh: '物联网工程 · 学士', en: 'B.Eng. Internet of Things Engineering' },
    summary: {
      zh: '从唐山到石家庄读大学，学物联网工程。四年里硬件、软件、社团都碰过，真正留下来的是对系统和自学方法的兴趣。',
      en: 'Moved from Tangshan to Shijiazhuang for university and studied IoT engineering. Four years of hardware, software and a student club; what stayed was an interest in systems and a way of learning that is my own.',
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
