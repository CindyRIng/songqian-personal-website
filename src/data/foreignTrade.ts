/**
 * FOREIGN-TRADE HUB — copy + FAQ for `/foreign-trade/`.
 *
 * This is the pillar page of the Chinese foreign-trade cluster. The guides
 * themselves live in the `guides` content collection; this file only holds the
 * hub's own copy, keyword list and FAQ. Keep it practical and first-person.
 */
export interface FAQ {
  q: string;
  a: string;
}

export const foreignTrade = {
  updated: '2026-11-21',

  title: '外贸获客与客户管理',
  kicker: '外贸 / FOREIGN TRADE',

  intro:
    '我在孚盟软件做外贸 SaaS 客户经理。每天的工作是想清楚三件事：客户在哪、怎么开口、接下来谁跟进。这个栏目把这几年的做法写下来——电话、展会、开发信、客户管理系统，以及现在用 AI 的部分。不是行业报告，是能直接拿去改自己流程的清单。',

  summary: [
    '获客先分层：先想清楚客户画像和判断标准，再决定去哪找。拿到名单就群发，通常最慢。',
    '客户管理先统一数据：客户、联系人、跟进记录放在一处，能交接，再谈自动化。',
    '第一次接触的目标不是成交，是拿到下一次沟通的许可。',
    'AI 先接流程，再买工具。流程里没有的动作，AI 也变不出来。',
  ],

  fit: {
    yes: ['刚入行的外贸业务员', '正在搭客户管理流程的外贸经理', '带 3–20 人团队、想把跟进做扎实的人', '想用 AI 提效但不想被工具牵着走的人'],
    no: ['找“一键爆单”工具的人', '不想改现有流程、只想要一个软件的人', '需要行业报告或平台代运营的人'],
  },

  faqs: [
    {
      q: '外贸客户管理系统和普通 CRM 有什么区别？',
      a: '普通 CRM 管线索和商机；外贸还要管多币种报价、形式发票、报关资料、展会名录、邮件往来和跨时区跟进。通用 CRM 能改，但配置成本和培训成本要算进去。',
    },
    {
      q: '小团队要不要上外贸客户管理系统？',
      a: '三个人以下，Excel 加共享盘通常还能撑，但客户交接会丢信息。先统一数据结构和跟进规则，再选轻量工具；先买系统再想流程，往往用不起来。',
    },
    {
      q: '外贸获客渠道哪个最有效？',
      a: '没有单一渠道。展会拿信任、Google 和海关数据拿名单、开发信和电话拿第一次沟通、老客户转介绍拿高质量线索。按客单价和成交周期组合，别在一个渠道上赌全部预算。',
    },
    {
      q: '外贸新人应该先学什么？',
      a: '先跑完一个完整客户周期：找客户、判断、写开发信、打电话、报价、跟进、记录。产品知识和英语都可以边做边补，没有完整周期经验，学再多话术也用不上。',
    },
    {
      q: 'AI 能替代外贸业务员吗？',
      a: '替不掉判断、关系和承担结果。能替掉的是整理资料、翻译邮件、写初稿、录跟进记录、做客户分层这些重复动作。先把这些动作从流程里找出来，再决定接什么 AI。',
    },
    {
      q: '你提供外贸咨询或培训吗？',
      a: '提供，以个人身份做获客诊断、客户管理流程梳理和团队培训，不推销软件、不做代运营。具体范围和联系方式在 /consulting/。',
    },
  ] as FAQ[],

  /** Cross-links shown at the bottom of the hub. */
  relatedLinks: [
    { href: '/foreign-trade/glossary/', label: '外贸术语表', note: '报价、单据、物流与获客常用词' },
    { href: '/consulting/', label: '外贸咨询与培训', note: '获客诊断 / 客户管理系统落地 / 团队培训' },
    { href: '/works/fuma-platform/', label: '外贸客户管理工具实践', note: '把孚盟网页端封装成可编程接口' },
    { href: '/writing/cold-calls-at-fumamx/', label: '在孚盟打电话', note: '2700 通电话、3 单成交的复盘' },
  ],
};
