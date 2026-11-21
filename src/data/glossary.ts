/**
 * GLOSSARY — 外贸术语表 (`/foreign-trade/glossary/`).
 *
 * Source: `.work/kb/v5/notes/` (外贸主流程, 获客方式汇总, 报价术语汇总,
 * 报价单, 形式合同 PI) and the V5 keyword map. Definitions are written for
 * someone who just started doing foreign trade — concrete, no textbook filler,
 * no prices or internal company numbers.
 *
 * The page is Chinese-only (`translated={false}`), so definitions are zh.
 * `slug` is the stable anchor id used on the page.
 */
export type GuideSlug = 'customer-management' | 'lead-generation' | 'outreach' | 'canton-fair' | 'ai';

export interface GlossaryTerm {
  slug: string;
  term: string;
  en: string;
  /** 40–90 Chinese characters. */
  definition: string;
  /** Optional link back to the most relevant long guide. */
  relatedGuide?: GuideSlug;
}

export interface GlossaryGroup {
  id: string;
  label: string;
  en: string;
  intro: string;
  terms: GlossaryTerm[];
}

/** Last real update of this list — shown on the page and in JSON-LD. */
export const glossaryUpdated = '2026-11-21';

/** The five long guides this glossary cross-links to. */
export const glossaryGuides: {
  slug: GuideSlug;
  url: string;
  title: string;
  keyword: string;
}[] = [
  {
    slug: 'customer-management',
    url: '/foreign-trade/customer-management/',
    title: '外贸客户管理系统：把客户从 Excel 里拿出来',
    keyword: '外贸客户管理系统',
  },
  {
    slug: 'lead-generation',
    url: '/foreign-trade/lead-generation/',
    title: '外贸获客：渠道、成本与分层跟进',
    keyword: '外贸获客渠道',
  },
  {
    slug: 'outreach',
    url: '/foreign-trade/outreach/',
    title: '外贸开发信与电话开发：第一次接触怎么开始',
    keyword: '开发信与电话开发',
  },
  {
    slug: 'canton-fair',
    url: '/foreign-trade/canton-fair/',
    title: '广交会客户跟进：展前、展中、展后 SOP',
    keyword: '广交会客户跟进',
  },
  {
    slug: 'ai',
    url: '/foreign-trade/ai/',
    title: '外贸 AI：把工具接进业务流程',
    keyword: '外贸 AI 落地',
  },
];

export const glossaryGroups: GlossaryGroup[] = [
  {
    id: 'leads',
    label: '客户与线索',
    en: 'Customers & leads',
    intro: '从一条询盘到能交接的客户，中间要判断、分层、记录。',
    terms: [
      {
        slug: 'inquiry',
        term: '询盘',
        en: 'Inquiry',
        relatedGuide: 'outreach',
        definition:
          '客户主动发来的需求询问。质量看产品、数量、目的国和具体要求；只有一句“请报价”的，先问清规格再报。',
      },
      {
        slug: 'lead',
        term: '线索',
        en: 'Lead',
        relatedGuide: 'lead-generation',
        definition:
          '还没确认需求的潜在客户，来自展会、平台、海关数据或老客户介绍。先入池再分层，别直接当询盘跟。',
      },
      {
        slug: 'customer-master-data',
        term: '客户主数据',
        en: 'Customer master data',
        relatedGuide: 'customer-management',
        definition:
          '客户的公司、联系人、地区、成交记录等基础信息。散在 Excel、邮箱和手机里，人一走就断；集中一处才谈得上交接。',
      },
      {
        slug: 'customer-tiering',
        term: '客户分级',
        en: 'Customer tiering',
        relatedGuide: 'customer-management',
        definition:
          '按成交概率、订单规模和维护成本把客户分成 A/B/C。A 类每周跟，B 类定期触达，C 类进邮件池，避免平均用力。',
      },
      {
        slug: 'decision-chain',
        term: '决策链',
        en: 'Decision-making chain',
        relatedGuide: 'customer-management',
        definition:
          '一单背后通常有采购、老板、技术或验货人。只跟一个人聊，价格谈好了也可能卡在最后一环；先弄清谁拍板。',
      },
      {
        slug: 'repeat-order',
        term: '复购',
        en: 'Repeat order',
        relatedGuide: 'customer-management',
        definition:
          '同一客户第二次及之后的订单。外贸的利润大多在复购里；交期、单证和售后做稳，比再开发三个新客户划算。',
      },
      {
        slug: 'handover',
        term: '客户交接',
        en: 'Handover',
        relatedGuide: 'customer-management',
        definition:
          '把客户历史、报价、承诺和未结事项交给同事。没有记录就没有交接，所以跟进要写日志，而不是只记在脑子里。',
      },
      {
        slug: 'dormant-customer',
        term: '沉睡客户',
        en: 'Dormant customer',
        relatedGuide: 'customer-management',
        definition:
          '超过一段时间没有下单或回复的老客户。价格、对接人或订单周期变化都可能让人沉默；定期翻出来触达，比只盯新客便宜。',
      },
    ],
  },
  {
    id: 'quotes',
    label: '报价与合同',
    en: 'Quotes & contracts',
    intro: '报价和单证上的数字，最后都要和合同、报关对得上。',
    terms: [
      {
        slug: 'quotation',
        term: '报价单',
        en: 'Quotation',
        definition:
          '列明产品、规格、数量、单价、贸易术语和有效期的正式报价。口头价不算数，发出去的报价要能追到依据。',
      },
      {
        slug: 'pi',
        term: 'PI 形式发票',
        en: 'Proforma Invoice (PI)',
        definition:
          '成交前发给客户的形式发票，用来确认订单、安排付款或开证。它不是税务发票，但品名、数量、单价要和后续单证一致。',
      },
      {
        slug: 'commercial-invoice',
        term: '商业发票',
        en: 'Commercial Invoice',
        definition:
          '报关和收汇用的正式发票。金额、币种、贸易术语要和合同、提单对得上；和 PI 不一致，银行或海关会来问。',
      },
      {
        slug: 'packing-list',
        term: '装箱单',
        en: 'Packing List',
        definition:
          '列清每箱品名、数量、毛净重和体积。报关、订舱、客户清点都靠它，数据必须和发票对得上。',
      },
      {
        slug: 'incoterms',
        term: '贸易术语',
        en: 'Incoterms',
        definition:
          'FOB、CIF、EXW 这类国际贸易术语，规定谁负责运输、保险和风险转移。签合同前先确认术语和版本，责任才清楚。',
      },
      {
        slug: 'fob',
        term: 'FOB 离岸价',
        en: 'Free On Board',
        definition:
          '卖方把货交到装运港船上，之后运费和保险由买方承担。报价时最容易漏的是装柜前的内陆费和港杂费。',
      },
      {
        slug: 'cif',
        term: 'CIF 到岸价',
        en: 'Cost, Insurance and Freight',
        definition:
          '卖方承担运费和保险到目的港。CIF 不等于送货上门，目的港清关和提货通常还是买方的事。',
      },
      {
        slug: 'exw',
        term: 'EXW 工厂交货',
        en: 'Ex Works',
        definition:
          '买方自己安排提货、出口报关和运输。价格最低，但客户没有出口能力时，后续问题都会回来找你。',
      },
      {
        slug: 'moq',
        term: 'MOQ 最小起订量',
        en: 'Minimum Order Quantity',
        definition:
          '供应商愿意接的最小订单量。低于 MOQ 不是不能做，而是单价、包装和交期都要重算，别当场答应客户。',
      },
    ],
  },
  {
    id: 'logistics',
    label: '物流与报关',
    en: 'Logistics & customs',
    intro: '签单之后最容易出问题的环节，名字先认全。',
    terms: [
      {
        slug: 'customs-declaration',
        term: '报关',
        en: 'Customs declaration',
        definition:
          '向海关申报出口货物的品名、数量、金额和贸易方式。资料由报关行整理，但数据源头在业务和单证。',
      },
      {
        slug: 'hs-code',
        term: 'HS 编码',
        en: 'HS Code',
        definition:
          '国际统一的商品编码，决定税率、监管条件和要不要商检。同一个产品报错编码，轻则退单，重则补税。',
      },
      {
        slug: 'bill-of-lading',
        term: '提单',
        en: 'Bill of Lading (B/L)',
        definition:
          '承运人签发的运输和物权凭证。正本、电放、海运单的放货方式不同，放货节奏要和客户付款方式匹配。',
      },
      {
        slug: 'freight-forwarder',
        term: '货代',
        en: 'Freight forwarder',
        definition:
          '帮订舱、报关、拖车的服务商。好货代的价值在出问题时能说清进度；报价低不等于总成本低。',
      },
      {
        slug: 'fcl-lcl',
        term: '整柜 / 拼箱',
        en: 'FCL / LCL',
        definition:
          '整柜是包一个集装箱，拼箱是和其他货共用一个柜。小单走拼箱省钱，但截关时间和货损风险要提前和客户讲。',
      },
      {
        slug: 'customs-clearance',
        term: '清关',
        en: 'Customs clearance',
        definition:
          '进口国海关放行货物的过程。慢通常卡在资料、税费或产品认证，不是货代一句“在办了”能解决的。',
      },
      {
        slug: 'certificate-of-origin',
        term: '原产地证',
        en: 'Certificate of Origin',
        definition:
          '证明货物原产地的文件，客户清关和享受关税优惠时要用。不同自贸协定对应不同证书，办之前先问清用途。',
      },
    ],
  },
  {
    id: 'channels',
    label: '获客与渠道',
    en: 'Prospecting & channels',
    intro: '渠道没有好坏，只有适不适合你的产品和团队。',
    terms: [
      {
        slug: 'customs-data',
        term: '海关数据',
        en: 'Customs data',
        relatedGuide: 'lead-generation',
        definition:
          '各国海关公开的进出口记录，能看谁在买、从谁买、买多少。它给的是线索不是答案，还要电话或邮件去验证。',
      },
      {
        slug: 'google-prospecting',
        term: '谷歌开发',
        en: 'Google prospecting',
        relatedGuide: 'lead-generation',
        definition:
          '用关键词、site: 和产品词在谷歌找客户官网和采购信息。比平台询盘慢，但客户更准，适合有耐心的行业。',
      },
      {
        slug: 'linkedin-prospecting',
        term: '领英获客',
        en: 'LinkedIn prospecting',
        relatedGuide: 'lead-generation',
        definition:
          '在领英按职位、行业、地区找采购和老板。先看对方发什么再发消息，群发模板基本没人回。',
      },
      {
        slug: 'trade-fair',
        term: '展会获客',
        en: 'Trade fair',
        relatedGuide: 'canton-fair',
        definition:
          '广交会这类线下展会，最短时间见到最多买家。真正的工作在展前邀约和展后跟进，展中只是收集名片。',
      },
      {
        slug: 'cold-email',
        term: '开发信',
        en: 'Cold email',
        relatedGuide: 'outreach',
        definition:
          '发给没接触过的客户的第一封邮件。主题写清产品和他有什么关系，正文三句话说清你是谁、做什么、下一步。',
      },
      {
        slug: 'cold-call',
        term: '电话开发',
        en: 'Cold call',
        relatedGuide: 'outreach',
        definition:
          '主动打给陌生客户。目的不是成交，而是确认对方是不是目标客户、要不要发资料；被拒绝也比群发邮件有效。',
      },
    ],
  },
];

/** Flat list — used for the DefinedTermSet JSON-LD and the term counter. */
export const glossaryTerms: GlossaryTerm[] = glossaryGroups.flatMap((group) => group.terms);

export function guideForSlug(slug: GuideSlug) {
  return glossaryGuides.find((guide) => guide.slug === slug);
}
