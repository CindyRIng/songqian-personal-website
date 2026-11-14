/**
 * PERSONAL PROFILE — the single source of truth for who this site is about.
 * Edit this file to change the owner's identity, bio, socials and CV.
 * Content-heavy pages (posts / projects / timeline) live in src/content + src/data.
 *
 * NOTE: `L` is a localized text map. `en` is required; missing locales fall
 * back to English (or to Chinese where noted). Keep all six in sync eventually.
 */
import type { Locale } from '../i18n/config';

export type L = { en: string } & Partial<Record<Locale, string>>;

/** Pick a localized string, with a graceful fallback chain. */
export function lt(value: L | string | undefined, lang: Locale, fallback?: L): string {
  if (!value) return fallback ? lt(fallback, lang) : '';
  if (typeof value === 'string') return value;
  return value[lang] ?? value.en ?? (fallback ? lt(fallback, lang) : '');
}

export const profile = {
  /** Legal/stage name, and the Latin spelling used in the header/logo. */
  name: { en: 'Song Qian', zh: '宋倩' } as L,
  latinName: 'Song Qian',
  monogram: 'SQ',

  /** One-line identity, used under the H1 and in the footer. */
  role: {
    en: 'Product designer & builder',
    zh: '产品设计师 / 独立开发者',
    ja: 'プロダクトデザイナー / 開発者',
    es: 'Diseñadora de producto y desarrolladora',
    fr: 'Designer produit & développeuse',
    de: 'Produktdesignerin & Entwicklerin',
  } as L,

  /** Short tagline used on the home page and in metadata. */
  tagline: {
    en: 'Designing calm, useful software — and the occasional beautiful website.',
    zh: '做安静而有用的产品，偶尔也做一点好看的网页。',
    ja: '静かで役に立つソフトウェアをつくっています。',
    es: 'Diseño software sereno y útil — y alguna web bonita de vez en cuando.',
    fr: 'Je conçois des logiciels calmes et utiles — et parfois de beaux sites.',
    de: 'Ich gestalte ruhige, nützliche Software — und gelegentlich schöne Websites.',
  } as L,

  location: {
    en: 'Shanghai, China',
    zh: '中国 · 上海',
    ja: '中国・上海',
    es: 'Shanghái, China',
    fr: 'Shanghai, Chine',
    de: 'Shanghai, China',
  } as L,

  timezone: 'Asia/Shanghai',

  email: 'hello@songqian.dev',

  /** Social links — label is the platform, handle is what's displayed. */
  socials: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng', handle: '@CindyRIng' },
    { label: 'X / Twitter', href: 'https://x.com/songqian', handle: '@songqian' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/songqian', handle: '/in/songqian' },
    { label: 'Email', href: 'mailto:hello@songqian.dev', handle: 'hello@songqian.dev' },
  ],

  /** The greeting paragraphs on the home page. First person, warm, specific. */
  homeBio: [
    {
      en: 'Welcome to my corner of the web. I design software for a living and build things for the joy of it — interfaces, type systems, small tools, and this site.',
      zh: '欢迎来到我的角落。我以设计软件为生，也为自己造点东西——界面、字体系统、小工具，以及这个网站。',
      ja: '私の小さな世界へようこそ。ソフトウェアのデザインを仕事にし、楽しみのためにものをつくっています。',
      es: 'Bienvenida a mi rincón de la web. Diseño software para vivir y construyo cosas por puro placer.',
      fr: 'Bienvenue dans mon coin du web. Je conçois des logiciels pour vivre et je construis des choses pour le plaisir.',
      de: 'Willkommen in meiner Ecke des Netzes. Ich gestalte beruflich Software und baue Dinge aus Freude am Bauen.',
    },
    {
      en: 'Currently a product designer working on AI-native tools. Previously design systems, fintech, and a few startups that taught me more than any classroom.',
      zh: '目前在做 AI 原生产品的设计。在此之前，做过设计系统、金融科技，以及几家教会我比课堂更多东西的创业公司。',
      ja: '現在は AI ネイティブなプロダクトのデザインに携わっています。',
      es: 'Actualmente diseño herramientas nativas de IA. Antes: sistemas de diseño, fintech y varias startups.',
      fr: "Je travaille aujourd'hui sur des outils natifs IA. Auparavant : design systems, fintech et quelques startups.",
      de: 'Derzeit arbeite ich an KI-nativen Werkzeugen. Davor: Designsysteme, Fintech und einige Startups.',
    },
  ] as L[],

  /** Longer, more reflective bio used on the About page. */
  aboutBio: [
    {
      en: "I'm a designer who codes. I care about the details other people skip — the weight of a divider, the exact easing curve on a hover, the difference between a page that loads and a page that feels instant.",
      zh: '我是一个会写代码的设计师。我在意那些别人跳过的细节——一条分隔线的重量、悬停时缓动的曲线、页面「加载出来」和「感觉很快」之间的差别。',
      ja: 'コードを書くデザイナーです。他の人が飛ばすような細部を大切にしています。',
      es: 'Soy una diseñadora que programa. Me importan los detalles que otros se saltan.',
      fr: "Je suis une designer qui code. J'aime les détails que les autres sautent.",
      de: 'Ich bin eine Designerin, die programmiert. Mir liegen die Details, die andere überspringen.',
    },
    {
      en: 'I studied design and spent the first years of my career shipping interfaces nobody noticed — which is, I think, the highest compliment an interface can receive. Later I moved into design systems and product strategy.',
      zh: '我学的是设计，职业生涯的前几年一直在做那些「没人注意到」的界面——我想，这大概是对一个界面最高的赞美。后来转向设计系统与产品策略。',
      ja: 'デザインを学び、キャリアの最初の数年間は誰も気づかないインターフェースをつくっていました。',
      es: 'Estudié diseño y pasé mis primeros años creando interfaces que nadie notaba.',
      fr: "J'ai étudié le design et passé mes premières années à livrer des interfaces que personne ne remarquait.",
      de: 'Ich habe Design studiert und in meinen ersten Jahren Interfaces gebaut, die niemand bemerkte.',
    },
  ] as L[],

  /** "Now" block — what I'm focused on at the moment. */
  now: [
    {
      en: 'Building a small AI writing tool in public. Reading more paper books. Trying to take fewer, better photographs.',
      zh: '在公开构建一个小型 AI 写作工具。多读纸质书。努力拍更少但更好的照片。',
      ja: '小さな AI 執筆ツールを公開制作中。紙の本をよく読んでいます。',
      es: 'Construyendo una pequeña herramienta de escritura con IA en público.',
      fr: 'Je construis un petit outil d’écriture IA en public.',
      de: 'Ich baue ein kleines KI-Schreibwerkzeug öffentlich.',
    },
  ] as L[],

  /**
   * Short CV rows for the About page. Full stories live on the Timeline page.
   * `end: null` means "Present".
   */
  experience: [
    { org: 'Lumen Labs', role: { en: 'Product Designer', zh: '产品设计师' } as L, start: '2024', end: null as string | null },
    { org: 'Meridian', role: { en: 'Senior Product Designer, Design Systems', zh: '高级产品设计师，设计系统' } as L, start: '2021', end: '2024' },
    { org: 'Fieldnote', role: { en: 'Product Designer', zh: '产品设计师' } as L, start: '2019', end: '2021' },
    { org: 'Independent', role: { en: 'Freelance Designer & Developer', zh: '独立设计师 / 开发者' } as L, start: '2017', end: '2019' },
    { org: 'Tongji University', role: { en: 'B.A. Visual Communication Design', zh: '视觉传达设计 学士' } as L, start: '2013', end: '2017' },
  ],

  /** "Elsewhere" links shown on About. */
  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng' },
    { label: 'X / Twitter', href: 'https://x.com/songqian' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/songqian' },
    { label: 'Read.cv', href: 'https://read.cv/songqian' },
  ],

  /** Colophon facts — how the site is made. */
  colophon: [
    {
      en: 'Designed and coded by hand. No themes, no templates — every pixel is deliberate.',
      zh: '设计与代码全部手写。没有主题，没有模板——每一个像素都是刻意的。',
      ja: 'デザインもコードも手書き。テーマもテンプレートもありません。',
      es: 'Diseñado y programado a mano. Sin temas ni plantillas.',
      fr: 'Conçu et codé à la main. Sans thème ni modèle.',
      de: 'Von Hand gestaltet und programmiert. Keine Themes, keine Vorlagen.',
    },
    {
      en: 'Built with Astro, Tailwind CSS and TypeScript; self-hosted variable fonts; hosted on Cloudflare.',
      zh: '使用 Astro、Tailwind CSS 与 TypeScript 构建；自托管可变字体；部署于 Cloudflare。',
      ja: 'Astro・Tailwind CSS・TypeScript で構築。可変フォントはセルフホスト。',
      es: 'Construido con Astro, Tailwind CSS y TypeScript; tipografías variables autoalojadas.',
      fr: 'Construit avec Astro, Tailwind CSS et TypeScript ; polices variables auto-hébergées.',
      de: 'Gebaut mit Astro, Tailwind CSS und TypeScript; selbst gehostete variable Schriften.',
    },
  ] as L[],

  /** Footer age counter origin. */
  siteLaunch: '2026-01-01',

  /**
   * SEO defaults (title is derived per-locale in BaseLayout from name + role).
   */
  seo: {
    description: {
      en: 'Song Qian is a product designer and builder based in Shanghai, working on AI-native tools, design systems and the craft of the web.',
      zh: '宋倩是一位常驻上海的产品设计师与开发者，专注于 AI 原生工具、设计系统，以及网页工艺。',
      ja: '上海を拠点に活動するプロダクトデザイナー兼開発者。AI ネイティブなツール、デザインシステム、ウェブの工芸に取り組んでいます。',
      es: 'Song Qian es diseñadora de producto y desarrolladora en Shanghái, especializada en herramientas nativas de IA, sistemas de diseño y el oficio de la web.',
      fr: 'Song Qian est designer produit et développeuse basée à Shanghai, spécialisée dans les outils natifs IA, les design systems et le métier du web.',
      de: 'Song Qian ist Produktdesignerin und Entwicklerin in Shanghai und arbeitet an KI-nativen Werkzeugen, Designsystemen und der Kunst des Webs.',
    } as L,
  },
} as const;

export type Profile = typeof profile;
