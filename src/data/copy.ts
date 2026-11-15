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
    kicker: { zh: '销售 · 代码 · 写作', en: 'SALES × CODE × WRITING' } as L,
    name: { zh: '宋谦', en: 'Song Qian' } as L,
    latinName: 'Song Qian',
    role: {
      zh: '孚盟软件 客户经理 · AI 工作流构建者',
      en: 'Account manager at Fumamx · AI workflow builder',
    } as L,
    availability: {
      zh: '可聊 AI 实施 · 销售工具 · 合作',
      en: 'Open to AI implementation · sales tooling · collaboration',
    } as L,
    intro: [
      {
        zh: '白天卖软件，晚上造工具。我在石家庄的孚盟软件做外贸 SaaS 客户经理——和客户聊业务、跑工厂、打电话；晚上把销售里重复、耗时的部分写成工具：孚盟本地封装、飞鸽外呼，还有几个招聘和拓客的客户端。',
        en: "I sell software by day and build tools by night. I'm an account manager for foreign-trade SaaS at Fumamx in Shijiazhuang — talking to customers, visiting factories, making calls. After hours I turn the repetitive parts of sales into software: a local Fumamx wrapper, an outbound-calling platform, and a few clients for job boards and prospecting.",
      },
      {
        zh: '电话打了 2700 通，成交 3 单——我学到的是每通电话值 1 块钱。所以更愿意把时间花在能复利的地方：写代码、写东西，把经验沉淀成系统。',
        en: '2,700 calls, 3 deals — which taught me each call was worth about one yuan. So I would rather spend time where it compounds: writing code, writing essays, and turning experience into systems.',
      },
    ] as L[],
    ctas: {
      works: { zh: '看作品', en: 'View work' } as L,
      writing: { zh: '读文章', en: 'Read writing' } as L,
      contact: { zh: '写信', en: 'Say hello' } as L,
    },
    quickFacts: [
      { label: { zh: '现居', en: 'Based in' } as L, value: { zh: '石家庄', en: 'Shijiazhuang' } as L },
      { label: { zh: '现在', en: 'Now' } as L, value: { zh: '孚盟软件 · 客户经理', en: 'Fumamx · Account manager' } as L },
      {
        label: { zh: '在做', en: 'Building' } as L,
        value: { zh: '6 个本地工具 + 1 条销售工具链', en: '6 local tools + 1 sales toolchain' } as L,
      },
      {
        label: { zh: '在读', en: 'Reading' } as L,
        value: { zh: 'Apostol《微积分》· 系统工程', en: "Apostol's calculus · systems engineering" } as L,
      },
      { label: { zh: '网球', en: 'Tennis' } as L, value: { zh: '每周 2 次', en: 'Twice a week' } as L },
    ],
    stats: [
      { value: '5', label: { zh: '篇文章', en: 'Essays' } as L },
      { value: '6', label: { zh: '个工具', en: 'Tools' } as L },
      { value: '43', label: { zh: '项能力', en: 'Capabilities' } as L },
      { value: '93', label: { zh: '项测试通过', en: 'Tests passing' } as L },
    ],
    plate: {
      quote: {
        zh: '把销售流程写成软件，把经验沉淀成系统。',
        en: 'Turning sales work into software, and experience into systems.',
      } as L,
      meta: {
        zh: '石家庄 · 2026 · 北纬 38.04° · 东经 114.51°',
        en: 'SHIJIAZHUANG · 2026 · 38.04°N · 114.51°E',
      } as L,
    },
  },

  sections: {
    works: {
      number: '01',
      title: { zh: '工作', en: 'Works' } as L,
      lede: {
        zh: '6 个自建工具，都是为了让重复的事只做一次。',
        en: 'Six tools I built so repetitive work only happens once.',
      } as L,
      action: { zh: '全部作品', en: 'All works' } as L,
    },
    writing: {
      number: '02',
      title: { zh: '写作', en: 'Writing' } as L,
      lede: {
        zh: '关于系统、杠杆与慢反馈。',
        en: 'Notes on systems, leverage and slow feedback.',
      } as L,
      action: { zh: '全部文章', en: 'All essays' } as L,
    },
    timeline: {
      number: '03',
      title: { zh: '时间线', en: 'Timeline' } as L,
      lede: { zh: '2022 → 现在。', en: '2022 → now.' } as L,
      action: { zh: '完整时间线', en: 'Full timeline' } as L,
    },
    contact: {
      number: '04',
      title: { zh: '联系', en: 'Contact' } as L,
      lede: { zh: '有事写信。', en: 'Just write to me.' } as L,
    },
  },

  works: {
    title: { zh: '作品', en: 'Works' } as L,
    lede: {
      zh: '2 个精选项目，4 个工具。全部自己设计、自己写、自己维护。',
      en: 'Two featured projects and four tools — all designed, written and maintained by me.',
    } as L,
    featuredTitle: { zh: '精选项目', en: 'Featured work' } as L,
    toolsTitle: { zh: '工具', en: 'Tools' } as L,
    filterLabel: { zh: '筛选', en: 'Filter' } as L,
  },

  writing: {
    title: { zh: '写作', en: 'Writing' } as L,
    lede: {
      zh: '关于系统、杠杆、AI 与慢反馈。更新很慢，但每篇都认真写。',
      en: 'Notes on systems, leverage, AI and slow feedback. Slow to publish, careful to write.',
    } as L,
  },

  about: {
    title: { zh: '关于', en: 'About' } as L,
    lede: {
      zh: '三条线：销售、代码、写作。',
      en: 'Three threads: sales, code and writing.',
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
      zh: '14 个节点，2022 到 2026。',
      en: 'Fourteen entries, 2022 to 2026.',
    } as L,
  },

  contact: {
    heading: { zh: '有事写信。', en: 'Just write to me.' } as L,
    body: {
      zh: '如果你也在把重复的事做成系统，或者想聊 AI 怎么接进业务流程——写信给我，我基本都会回。',
      en: "If you're also turning repetitive work into systems, or want to talk about wiring AI into real business processes — write to me. I usually reply.",
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
          zh: '正职是孚盟软件的客户经理，做外贸 SaaS 的销售与客户服务；业余把销售里重复、耗时的部分写成工具，也写关于系统、杠杆和 AI 的文章。',
          en: 'By day I am an account manager at Fumamx, selling and supporting foreign-trade SaaS. After hours I turn the repetitive parts of that work into tools, and write about systems, leverage and AI.',
        } as L,
      },
      {
        q: { zh: '这个网站是你自己做的吗？', en: 'Did you build this site yourself?' } as L,
        a: {
          zh: '是。Astro 7 + Tailwind CSS 4 + TypeScript，静态输出，中英双语，部署在 Cloudflare Pages；设计、代码和文案都是自己写的。',
          en: 'Yes. Astro 7 + Tailwind CSS 4 + TypeScript, static output, Chinese and English, deployed on Cloudflare Pages. Design, code and copy are all mine.',
        } as L,
      },
      {
        q: { zh: '你在找什么合作或机会？', en: 'What are you open to?' } as L,
        a: {
          zh: 'AI 实施、销售工具与流程自动化、企业 AI 培训与售前方案；也欢迎聊工具、网球或写作。',
          en: 'AI implementation, sales tooling and workflow automation, enterprise AI training and pre-sales. Conversations about tools, tennis or writing are welcome too.',
        } as L,
      },
      {
        q: { zh: '项目里的数字可信吗？', en: 'Are the numbers in your projects real?' } as L,
        a: {
          zh: '项目指标来自各自的 README 与测试结果（例如 53 个测试、93/93 测试通过、27/27 验收），没有编造的用户量或收入。',
          en: 'Project metrics come from each repository README and test results (e.g. 53 tests, 93/93 passing, 27/27 acceptance). No invented users or revenue.',
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
    homeTitle: { zh: '宋谦 · 孚盟软件客户经理 / AI 工作流构建者', en: 'Song Qian · Account manager at Fumamx / AI workflow builder' } as L,
    homeDescription: {
      zh: '宋谦，石家庄，孚盟软件客户经理。白天卖外贸 SaaS，晚上把销售流程写成软件：孚盟本地封装、飞鸽外呼、招聘与拓客客户端。',
      en: 'Song Qian — account manager at Fumamx in Shijiazhuang. Selling foreign-trade SaaS by day, building local sales tools by night.',
    } as L,
    worksDescription: {
      zh: '宋谦的 6 个自建工具：孚盟本地封装平台、飞鸽外呼平台、BOSS/智联/探迹本地客户端、网球捡球机器人。',
      en: "Song Qian's six self-built tools: a local Fumamx platform, an outbound-calling platform, local clients for BOSS/Zhaopin/Tanji, and a tennis-ball robot.",
    } as L,
    writingDescription: {
      zh: '关于系统、杠杆、AI 与慢反馈的文章。',
      en: 'Essays on systems, leverage, AI and slow feedback.',
    } as L,
    aboutDescription: {
      zh: '宋谦：销售、代码与写作三条线。2026 届物联网工程毕业，现在孚盟软件做客户经理。',
      en: 'Song Qian: sales, code and writing. 2026 IoT engineering graduate, now an account manager at Fumamx.',
    } as L,
    timelineDescription: {
      zh: '宋谦 2022–2026 的 14 个节点：大学、网球社、AI 实施实习、孚盟客户经理、自建工具链。',
      en: "Fourteen entries from Song Qian's 2022–2026: university, tennis club, AI implementation internship, Fumamx, and self-built tools.",
    } as L,
  },
} as const;
