/**
 * PAGE COPY — the voice of the site. Every line the visitor reads on the
 * home / works / writing / about / timeline / contact surfaces lives here, in
 * Chinese (primary) and English (secondary). Components receive strings as
 * props; never hard-code copy inside a component.
 *
 * Voice rules: short sentences, concrete numbers, no marketing jargon, no
 * "empower / closed loop / ecosystem". Sound like a person, not a deck.
 */
import type { Locale } from '../i18n/config';

export type L = { zh: string; en: string };

/** Locale-specific string. */
export const c = (value: L, lang: Locale): string => value[lang];

/**
 * Primary + secondary labels used by the bilingual section headings
 * (Chinese pages: zh primary / en secondary — and vice versa).
 */
export const pair = (value: L, lang: Locale): { title: string; secondary: string } =>
  lang === 'zh' ? { title: value.zh, secondary: value.en } : { title: value.en, secondary: value.zh };

/** Bilingual label pair for small metadata, e.g. "工作 / Works". */
export const both = (value: L): string => `${value.zh} / ${value.en}`;

export const copy = {
  home: {
    kicker: { zh: '石家庄 · 外贸 SaaS 销售', en: 'Shijiazhuang · foreign-trade SaaS sales' } as L,
    name: { zh: '宋谦', en: 'Song Qian' } as L,
    latinName: 'Song Qian',
    role: {
      zh: '孚盟软件 客户经理',
      en: 'Account manager at Fumamx',
    } as L,
    availability: {
      zh: '可聊 AI 实施 · 销售工具',
      en: 'Open to AI implementation · sales tooling',
    } as L,
    intro: [
      {
        zh: '我在孚盟软件做客户经理，卖外贸 SaaS。白天打电话、跑客户、跟单；晚上写点工具，把重复的事弄快一点。',
        en: "I'm an account manager at Fumamx, selling foreign-trade SaaS. Days are calls, customer visits and follow-ups. Nights go into small tools that make the repetitive parts faster.",
      },
      {
        zh: '这个站放我写过的东西、做过的工具，还有一些没想明白的问题。更新很慢，但都是自己写的。',
        en: "This site holds things I've written, tools I've built, and a few questions I haven't figured out. It updates slowly, but it's all mine.",
      },
    ] as L[],
    ctas: {
      works: { zh: '看作品', en: 'View work' } as L,
      writing: { zh: '读文章', en: 'Read writing' } as L,
      contact: { zh: '现在', en: 'Now' } as L,
    },
    quickFacts: [
      { label: { zh: '现居', en: 'Based in' } as L, value: { zh: '石家庄', en: 'Shijiazhuang' } as L },
      { label: { zh: '现在', en: 'Now' } as L, value: { zh: '孚盟软件 · 客户经理', en: 'Fumamx · account manager' } as L },
      {
        label: { zh: '在做', en: 'Building' } as L,
        value: { zh: '孚盟销售系统 · 6 个本地工具', en: 'A Fumamx sales system · 6 local tools' } as L,
      },
      {
        label: { zh: '在读', en: 'Reading' } as L,
        value: { zh: 'Apostol《微积分》·《系统工程》', en: "Apostol's Calculus · Systems Engineering" } as L,
      },
      { label: { zh: '在练', en: 'Training' } as L, value: { zh: '网球，冲着 3.5 去', en: 'Tennis, aiming for 3.5' } as L },
    ],
    stats: [
      { value: '392', label: { zh: '天日记', en: 'Days journaled' } as L },
      { value: '561', label: { zh: '条笔记', en: 'Notes taken' } as L },
      { value: '43', label: { zh: '个项目', en: 'Projects' } as L },
      { value: '4', label: { zh: '年网球', en: 'Years of tennis' } as L },
    ],
    plate: {
      quote: {
        zh: '真正托住一个人的，是那些日复一日、几乎无人看见的小事。',
        en: 'What holds a person up is the small, almost unseen things done day after day.',
      } as L,
      meta: {
        zh: '日记 · 2026 年 10 月 21 日',
        en: 'Diary · 21 Oct 2026',
      } as L,
    },
    tradeTitle: { zh: '外贸', en: 'Foreign trade' } as L,
    tradeLede: {
      zh: '外贸获客与客户管理，写给刚入行和正在带团队的人。',
      en: 'Foreign-trade lead generation and customer management — for people just starting out or running a team.',
    } as L,
    notesTitle: { zh: '最近在想', en: 'Recent notes' } as L,
    notesLede: {
      zh: '从日记和笔记里挑出来的，没怎么改。',
      en: 'Picked from my diary and notes, barely edited.',
    } as L,
    nowTitle: { zh: '现在', en: 'Now' } as L,
    nowLede: { zh: '2026 年 11 月。', en: 'November 2026.' } as L,
    readingTitle: { zh: '书桌', en: 'Reading' } as L,
    readingLede: { zh: '在读、读完、和读不下去的。', en: 'Reading, finished, and abandoned.' } as L,
  },

  sections: {
    works: {
      number: '',
      title: { zh: '工作', en: 'Works' } as L,
      lede: {
        zh: '六个工具，都是自己每天在用的。两个最常用。',
        en: 'Six tools I use myself. Two of them every day.',
      } as L,
      action: { zh: '全部作品', en: 'All works' } as L,
    },
    writing: {
      number: '',
      title: { zh: '写作', en: 'Writing' } as L,
      lede: {
        zh: '写工作里想不明白的事。',
        en: 'Writing to figure out what work does not explain.',
      } as L,
      action: { zh: '全部文章', en: 'All essays' } as L,
    },
    timeline: {
      number: '',
      title: { zh: '时间线', en: 'Timeline' } as L,
      lede: { zh: '2022 到 2026，捡重要的记。', en: '2022 to 2026, the parts worth writing down.' } as L,
      action: { zh: '完整时间线', en: 'Full timeline' } as L,
    },
    contact: {
      number: '',
      title: { zh: '联系', en: 'Contact' } as L,
      lede: { zh: '有事写信。', en: 'Just write to me.' } as L,
    },
  },

  works: {
    title: { zh: '作品', en: 'Works' } as L,
    lede: {
      zh: '六个自建工具。前两个每天在用，后面几个偶尔打开。',
      en: 'Six tools I built. The first two open every day; the rest, now and then.',
    } as L,
    featuredTitle: { zh: '精选项目', en: 'Featured work' } as L,
    toolsTitle: { zh: '工具', en: 'Tools' } as L,
    filterLabel: { zh: '筛选', en: 'Filter' } as L,
  },

  writing: {
    title: { zh: '写作', en: 'Writing' } as L,
    lede: {
      zh: '关于工作、学习、网球，和一些没答案的问题。',
      en: 'On work, learning, tennis, and a few questions without answers.',
    } as L,
  },

  about: {
    title: { zh: '关于', en: 'About' } as L,
    lede: {
      zh: '销售、代码、写作，还有网球和一堆没做完的项目。',
      en: 'Sales, code, writing, tennis, and a pile of unfinished projects.',
    } as L,
    threadsTitle: { zh: '三条线', en: 'Three threads' } as L,
    experienceTitle: { zh: '履历', en: 'Experience' } as L,
    nowTitle: { zh: '现在', en: 'Now' } as L,
    notesTitle: { zh: '草稿与照片', en: 'Notes & photos' } as L,
    notesHint: {
      zh: '手写稿、球场和日常。',
      en: 'Handwriting, tennis courts and ordinary days.',
    } as L,
    toolsTitle: { zh: '工具与方式', en: 'Tools & method' } as L,
    contactTitle: { zh: '联系', en: 'Contact' } as L,
    signature: {
      zh: '宋谦，石家庄，大多数清晨。',
      en: 'Song Qian, Shijiazhuang, most mornings.',
    } as L,
  },

  timeline: {
    title: { zh: '时间线', en: 'Timeline' } as L,
    lede: {
      zh: '2022 到 2026。记得不全，但没编。',
      en: '2022 to 2026. Not exhaustive, but not invented.',
    } as L,
  },

  contact: {
    heading: { zh: '有事写信。', en: 'Just write to me.' } as L,
    body: {
      zh: '聊工具、AI 实施、销售，或者网球都行。邮件我基本会回。',
      en: 'Tools, AI implementation, sales, or tennis — email works. I usually reply.',
    } as L,
    emailLabel: { zh: '邮箱', en: 'Email' } as L,
    phoneLabel: { zh: '电话', en: 'Phone' } as L,
    wechatLabel: { zh: '微信', en: 'WeChat' } as L,
    wechatHint: { zh: '扫码加我', en: 'Scan to add me' } as L,
    githubLabel: { zh: 'GitHub', en: 'GitHub' } as L,
    rssLabel: { zh: 'RSS', en: 'RSS' } as L,
  },

  faq: {
    title: { zh: '常见问题', en: 'FAQ' } as L,
    items: [
      {
        q: { zh: '你是做什么的？', en: 'What do you do?' } as L,
        a: {
          zh: '在孚盟软件做客户经理，卖外贸 SaaS。业余写点工具，也写点东西。',
          en: 'I am an account manager at Fumamx, selling foreign-trade SaaS. After hours I build small tools and write.',
        } as L,
      },
      {
        q: { zh: '这个网站是你自己做的吗？', en: 'Did you build this site yourself?' } as L,
        a: {
          zh: '是。Astro + Tailwind，静态页面，部署在 Cloudflare Pages；设计、代码、文案都是自己写的。',
          en: 'Yes. Astro + Tailwind, static pages on Cloudflare Pages. Design, code and copy are mine.',
        } as L,
      },
      {
        q: { zh: '网站上的内容哪来的？', en: 'Where does the content come from?' } as L,
        a: {
          zh: 'AI 实施、销售工具、企业培训。聊工具、网球、写作也行。',
          en: 'AI implementation, sales tooling, training. Tools, tennis and writing are fine too.',
        } as L,
      },
      {
        q: { zh: '项目里的数字可信吗？', en: 'Are the numbers in your projects real?' } as L,
        a: {
          zh: '来自各自的 README 和测试结果。没有编的用户量，也没有编的收入。',
          en: 'From each repository README and test output. No invented users, no invented revenue.',
        } as L,
      },
      {
        q: { zh: '怎么联系你？', en: 'How can I reach you?' } as L,
        a: {
          zh: '邮箱 cindyring_dream@outlook.com，或页脚的电话 / 微信二维码；GitHub 是 CindyRIng。',
          en: 'Email cindyring_dream@outlook.com, or use the phone / WeChat QR in the footer. GitHub: CindyRIng.',
        } as L,
      },
    ],
  },

  meta: {
    homeTitle: { zh: '宋谦｜外贸 SaaS 客户经理 · 外贸获客与客户管理', en: 'Song Qian — foreign-trade SaaS account manager' } as L,
    homeDescription: {
      zh: '宋谦，孚盟软件客户经理，写外贸获客、外贸客户管理系统与销售工具。2700 通电话、6 个自建工具的实践记录。',
      en: 'Song Qian, foreign-trade SaaS account manager in Shijiazhuang. Notes on foreign-trade lead generation, customer management systems and sales tooling.',
    } as L,
    worksDescription: {
      zh: '宋谦的 6 个自建外贸工具：孚盟本地封装平台（外贸客户管理系统）、飞鸽外呼平台、BOSS/智联/探迹获客客户端、网球捡球机器人。',
      en: "Song Qian's six self-built foreign-trade tools: a local Fumamx customer-management platform, an outbound-calling platform, clients for BOSS/Zhaopin/Tanji, and a tennis-ball robot.",
    } as L,
    writingDescription: {
      zh: '关于工作、学习、网球，和一些没答案的问题。',
      en: 'On work, learning, tennis, and a few questions without answers.',
    } as L,
    aboutDescription: {
      zh: '宋谦：销售、代码、写作，还有网球。2026 届物联网工程毕业，在孚盟软件做客户经理。',
      en: 'Song Qian: sales, code, writing, tennis. 2026 IoT engineering graduate, account manager at Fumamx.',
    } as L,
    timelineDescription: {
      zh: '宋谦 2022–2026 的 22 个节点：大学、网球社、AI 实施实习、孚盟客户经理、自建工具链。',
      en: "Twenty-two entries from Song Qian's 2022–2026: university, tennis club, AI implementation internship, Fumamx, and self-built tools.",
    } as L,
  },
} as const;
