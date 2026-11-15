/**
 * PERSONAL PROFILE — identity, bio, contact and colophon.
 * Public name only: 宋谦 / Song Qian (the legal name stays private).
 *
 * Page copy lives in `src/data/copy.ts`; the CV spine lives in
 * `src/data/timeline.ts`. This file is the person, not the pages.
 */
import type { Locale } from '../i18n/config';

export type L = { zh: string; en: string };

/** Pick a localized string, tolerating legacy partial maps. */
export function lt(value: L | string | undefined, lang: Locale, fallback?: L): string {
  if (!value) return fallback ? lt(fallback, lang) : '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.zh ?? value.en ?? (fallback ? lt(fallback, lang) : '');
}

export const profile = {
  name: { zh: '宋谦', en: 'Song Qian' } as L,
  latinName: 'Song Qian',
  monogram: 'SQ',

  role: {
    zh: '孚盟软件 客户经理 · AI 工作流构建者',
    en: 'Account manager at Fumamx · AI workflow builder',
  } as L,

  tagline: {
    zh: '把销售流程写成软件，把经验沉淀成系统。',
    en: 'Turning sales work into software, and experience into systems.',
  } as L,

  location: {
    zh: '石家庄，中国',
    en: 'Shijiazhuang, China',
  } as L,

  timezone: 'Asia/Shanghai',

  /** Public contact channels. Optional ones stay hidden until filled. */
  contact: {
    email: 'cindyring_dream@outlook.com',
    /** Add a public phone number here to reveal it on the site. */
    phone: '15652910075',
    /** Drop the QR code at public/images/wechat-qr.png and the WeChat block appears. */
    wechatQr: '/images/wechat-qr.png',
  },

  email: 'cindyring_dream@outlook.com',

  socials: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng', handle: '@CindyRIng' },
    { label: 'Email', href: 'mailto:cindyring_dream@outlook.com', handle: 'cindyring_dream@outlook.com' },
  ],

  /**
   * The three threads the site is built around (About page).
   * Order: sales → code → writing.
   */
  aboutBio: [
    {
      zh: '我的第一份正式工作是在孚盟做客户经理。外贸 SaaS 的客户经理，说白了就是：客户不懂的软件问题、流程问题、海外客户问题，你得接。2700 通电话、3 单成交、广交会、工厂……这份工作让我知道业务到底是怎么长出来的。',
      en: "My first real job is at Fumamx, as an account manager. For foreign-trade SaaS that means picking up whatever the customer cannot solve: software questions, process questions, overseas-client questions. 2,700 calls, three deals, the Canton Fair, factory visits — this job is how I learned where business actually comes from.",
    },
    {
      zh: '大学学的是物联网工程，硬件软件都碰过。真正开始写工具，是发现每天的工作里有太多重复：登录、复制、粘贴、填表。于是我把孚盟网页端封装成 CLI/REST/MCP，把外呼、录音、转写、跟进串成一条流水线，又写了几个招聘和拓客的本地客户端。6 个工具，都是自己每天在用的。',
      en: 'I studied IoT engineering in university — a bit of hardware, a bit of software. I started writing tools when I noticed how much of every day was repetition: sign in, copy, paste, fill another form. So I wrapped the Fumamx web app into CLI/REST/MCP, strung calling, recording, transcription and follow-up into one pipeline, and built local clients for job boards and prospecting. Six tools — all of them used by me, every day.',
    },
    {
      zh: '我写日记和复盘很多年，也写网球、复利、知识管理。写作对我来说不是输出，是想清楚。这个站里的文章，大多是先写给自己看的。',
      en: "I've kept a diary and written reviews for years, and I write about tennis, compounding and knowledge management. Writing is not output for me — it's how I think. Most of the essays here were written for myself first.",
    },
  ] as L[],

  now: {
    zh: '在孚盟做客户经理，维护一套自建的销售工具链；重读 Apostol 的《微积分》和系统工程；每周打两次网球。',
    en: 'Working as an account manager at Fumamx while maintaining a self-built sales toolchain; rereading Apostol’s calculus and systems engineering; playing tennis twice a week.',
  } as L,

  /** Short CV rows (kept for compatibility; About derives from timeline.ts). */
  experience: [
    { org: 'Fumamx', role: { zh: '客户经理', en: 'Account manager' } as L, start: '2026', end: null },
    { org: 'Yanshan Huayun', role: { zh: 'AI 实施实习生', en: 'AI implementation intern' } as L, start: '2026', end: '2026' },
    {
      org: 'Hebei University of Engineering Technology',
      role: { zh: '物联网工程 学士', en: 'B.Eng. Internet of Things Engineering' } as L,
      start: '2022',
      end: '2026',
    },
    { org: 'Tennis Club', role: { zh: '社长', en: 'President' } as L, start: '2025', end: '2025' },
  ],

  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng' },
    { label: 'Email', href: 'mailto:cindyring_dream@outlook.com' },
  ],

  colophon: [
    {
      zh: '设计与代码全部手写：Astro 7 + Tailwind CSS 4 + TypeScript，静态输出，没有前端框架。',
      en: 'Designed and coded by hand: Astro 7 + Tailwind CSS 4 + TypeScript, static output, no front-end framework.',
    },
    {
      zh: '字体自托管：Source Serif 4 / Inter / JetBrains Mono；中英两套页面由同一套模板生成。',
      en: 'Self-hosted fonts: Source Serif 4 / Inter / JetBrains Mono. Both languages come from the same templates.',
    },
    {
      zh: '排版语言致敬 paulstamatiou.com——暖纸、墨色、窄栏与克制的动效，但结构上做了自己的版本。',
      en: 'The typographic language is an homage to paulstamatiou.com — warm paper, ink, a narrow measure and restrained motion — with its own structure.',
    },
  ] as L[],

  /** Footer age counter origin — the first sketch of this site. */
  siteLaunch: '2026-07-14',

  seo: {
    description: {
      zh: '宋谦，石家庄，孚盟软件客户经理。白天卖外贸 SaaS，晚上把销售流程写成软件。',
      en: 'Song Qian — account manager at Fumamx in Shijiazhuang. Selling foreign-trade SaaS by day, building local sales tools by night.',
    } as L,
  },
} as const;

export type Profile = typeof profile;
