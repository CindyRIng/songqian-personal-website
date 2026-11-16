/**
 * NOW — a dated snapshot of what I'm actually doing this month.
 * Kept deliberately plain and specific: it should read like a page from a
 * notebook, not a landing page. Update it by hand when things change.
 *
 * `/now` is Chinese-first (the way I take notes). A short English summary is
 * rendered at the bottom for English readers.
 */
import type { L } from './copy';

export interface NowItem {
  zh: string;
  en?: string;
  href?: string;
}

export interface NowSection {
  label: L;
  items: NowItem[];
}

export const now = {
  updated: '2026-11-16',

  intro: {
    zh: '不定期更新。写我现在真的在做的事。',
    en: 'Updated when things change. What I am actually doing.',
  } as L,

  sections: [
    {
      label: { zh: '在做', en: 'Building' },
      items: [
        { zh: '孚盟销售系统：探迹、BOSS 客户端已经能用，智联还在补，web search agent 没接。', en: 'A Fumamx sales system: Tanji and BOSS clients work, Zhaopin is half done, the web-search agent is not started.' },
        { zh: '给这套系统补数据层，把客户主数据从 CSV 挪到 SQLite，做完再谈 UI。', en: 'Reworking its data layer — moving customer master data from CSV to SQLite before touching any UI.' },
        { zh: '偶尔直播讲外贸 AI，主要讲怎么把工具真的塞进业务里，不讲概念。', en: 'Occasional livestreams on AI for foreign trade — how tools actually fit into a workflow, not concepts.' },
      ],
    },
    {
      label: { zh: '在读', en: 'Reading' },
      items: [
        { zh: 'Apostol《微积分》第一卷。记了 23 小时，还没读完，实变部分读得很慢。', en: "Apostol's Calculus Vol. I — 23 hours in, still not finished; the real-analysis parts are slow.", href: '/reading' },
        { zh: '《系统工程原则与实践》，读到 156/661 页，用来对付毕业设计。', en: 'Systems Engineering Principles and Practice — page 156 of 661, for my thesis.', href: '/reading' },
        { zh: '《鸟哥的 Linux 私房菜》，当工具书翻。', en: "Brother Bird's Linux — as a reference, not cover to cover.", href: '/reading' },
      ],
    },
    {
      label: { zh: '在练', en: 'Training' },
      items: [
        { zh: '网球冲着 3.5 去：每周两到三次，最近在改底线相持和发球抛球。', en: 'Tennis, aiming for 3.5: two or three sessions a week, currently reworking baseline rallies and the ball toss.' },
        { zh: '腿部康复训练，隔天做，不做什么花活。', en: 'Leg rehab every other day. Nothing fancy.' },
      ],
    },
    {
      label: { zh: '在写', en: 'Writing' },
      items: [
        { zh: '《走一步看十步》——从一次数据迁移失败里学到的，还在改。', en: '"One step, ten steps ahead" — what a failed data migration taught me. Drafting.' },
        { zh: '《在孚盟打电话》——关于 2700 通电话、3 单成交，和每通电话值 1 块钱这件事。', en: '"Making calls at Fumamx" — 2,700 calls, 3 deals, and the one-yuan-per-call arithmetic.' },
        { zh: '这个网站本身。内容从日记和知识库里搬出来，搬得很慢。', en: 'This site. Moving content out of my diary and knowledge base, slowly.' },
      ],
    },
    {
      label: { zh: '生活', en: 'Life' },
      items: [
        { zh: '石家庄。工作日 7:45 起，通勤半小时；晚上经常拖到很晚，正在改。', en: 'Shijiazhuang. Up at 7:45 on weekdays, half an hour to work; late nights are still a problem I am trying to fix.' },
        { zh: '偶尔做饭，水平停留在“能吃”。', en: 'Cooking occasionally. The standard is "edible".' },
        { zh: '每周和家里打一次电话。', en: 'A call home once a week.' },
      ],
    },
    {
      label: { zh: '在担心', en: 'Worrying about' },
      items: [
        { zh: '今年同时开了太多项目。11 月开始把并行项目砍到 4 个，先砍掉那些“看起来该做”的。', en: 'I started too many projects this year. In November I cut the parallel list down to four, starting with the ones that only looked worth doing.' },
      ],
    },
    {
      label: { zh: '接下来', en: 'Next' },
      items: [
        { zh: '12 月：广交会客户跟进，把销售系统里欠的智联客户端补完。', en: 'December: follow up Canton Fair leads and finish the Zhaopin client.' },
        { zh: '读完 Apostol 第一卷，然后停下来想一想要不要读第二卷。', en: 'Finish Apostol Vol. I, then decide whether Vol. II is worth it.' },
        { zh: '把「笔记」页做成每周至少一条。', en: 'Keep the notes page to at least one entry a week.' },
      ],
    },
  ] as NowSection[],

  english: `I work as an account manager at Fumamx in Shijiazhuang, selling foreign-trade SaaS. At the moment I am building a local sales system around Fumamx (Tanji and BOSS clients work, Zhaopin is half done), reading Apostol's Calculus Vol. I and Systems Engineering Principles and Practice, playing tennis two or three times a week, and writing two essays about data migration and cold calls. I cut my parallel projects down to four in November because I had started too many things this year.`,
};
