/**
 * PERSONAL PROFILE — the single source of truth for who this site is about.
 * Real identity: 宋谦 / Song Qian. Public name only; the legal name is private.
 *
 * `L` is a localized text map. `en` is required; missing locales fall back to
 * English. Keep all six in sync when editing.
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
  /** Public name, and the Latin spelling used in the header/logo. */
  name: { en: 'Song Qian', zh: '宋谦' } as L,
  latinName: 'Song Qian',
  monogram: 'SQ',

  /** One-line identity, used under the H1 and in the footer. */
  role: {
    zh: '孚盟软件 · 客户经理 / AI 工作流构建者',
    en: 'Account manager at Fumamx · AI workflow builder',
    ja: 'Fumamx のアカウントマネージャー / AI ワークフロー構築',
    es: 'Gestor de cuentas en Fumamx · constructor de flujos con IA',
    fr: 'Responsable de comptes chez Fumamx · créateur de workflows IA',
    de: 'Account Manager bei Fumamx · Entwickler von KI-Workflows',
  } as L,

  /** Short tagline used on the home page and in metadata. */
  tagline: {
    zh: '把销售流程写成软件，把经验沉淀成系统。',
    en: 'Turning sales work into software, and experience into systems.',
    ja: '営業の仕事をソフトウェアに、経験をシステムに。',
    es: 'Convierto el trabajo de ventas en software y la experiencia en sistemas.',
    fr: 'Je transforme le travail commercial en logiciel, et l’expérience en systèmes.',
    de: 'Ich verwandle Vertriebsarbeit in Software und Erfahrung in Systeme.',
  } as L,

  location: {
    zh: '中国 · 石家庄',
    en: 'Shijiazhuang, China',
    ja: '中国・石家荘',
    es: 'Shijiazhuang, China',
    fr: 'Shijiazhuang, Chine',
    de: 'Shijiazhuang, China',
  } as L,

  timezone: 'Asia/Shanghai',

  email: 'cindyring_dream@outlook.com',

  /** Social links — label is the platform, handle is what's displayed. */
  socials: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng', handle: '@CindyRIng' },
    { label: 'Email', href: 'mailto:cindyring_dream@outlook.com', handle: 'cindyring_dream@outlook.com' },
  ],

  /** The greeting paragraphs on the home page. First person, warm, specific. */
  homeBio: [
    {
      zh: '我是宋谦，2026 年从河北工程技术学院毕业，学的是物联网工程。现在在石家庄的孚盟软件做客户经理——卖外贸 SaaS，也把销售里重复、耗时的部分写成软件。',
      en: "I'm Song Qian. I graduated in 2026 with a degree in IoT engineering and now work as an account manager at Fumamx in Shijiazhuang — selling foreign-trade SaaS by day, and turning the repetitive parts of sales into software at night.",
      ja: '宋谦と申します。2026 年に IoT 工学を卒業し、現在は石家荘の Fumamx でアカウントマネージャーをしています。日中は海外貿易向け SaaS を売り、夜は営業の繰り返し作業をソフトウェアにしています。',
      es: 'Soy Song Qian. Me gradué en 2026 en Ingeniería IoT y ahora trabajo como gestor de cuentas en Fumamx, en Shijiazhuang: vendo SaaS para comercio exterior y convierto en software las partes repetitivas de las ventas.',
      fr: 'Je suis Song Qian. Diplômé en 2026 en ingénierie IoT, je travaille aujourd’hui comme responsable de comptes chez Fumamx à Shijiazhuang : je vends du SaaS pour le commerce international et je transforme en logiciel les parties répétitives de la vente.',
      de: 'Ich bin Song Qian. Ich habe 2026 meinen Abschluss in IoT-Technik gemacht und arbeite heute als Account Manager bei Fumamx in Shijiazhuang: tagsüber vertreibe ich SaaS für den Außenhandel, abends übersetze ich die repetitiven Teile des Vertriebs in Software.',
    },
    {
      zh: '白天和客户聊业务、跑工厂、打电话；晚上做工具：孚盟本地封装平台、飞鸽外呼平台、几个招聘与拓客的本地客户端。我相信一次投入、持续产出的事，也相信慢一点的复利。',
      en: 'By day I talk to customers, visit factories and make calls; at night I build tools — a local platform that wraps Fumamx into CLI/REST/MCP, an outbound calling platform, and a few local clients for job boards and prospecting. I believe in things that pay off from a single investment, and in slow compounding.',
      ja: '昼は顧客と話し、工場を訪ね、電話をかけます。夜はツールを作ります——Fumamx を CLI/REST/MCP に包むローカル基盤、コールアウト基盤、採用・開拓向けのローカルクライアント。一度の投資で続く成果と、ゆっくりした複利を信じています。',
      es: 'De día hablo con clientes, visito fábricas y hago llamadas; de noche construyo herramientas: una plataforma local que envuelve Fumamx en CLI/REST/MCP, una plataforma de llamadas salientes y varios clientes locales para portales de empleo y prospección. Creo en lo que rinde con una sola inversión y en el interés compuesto lento.',
      fr: 'Le jour, je parle aux clients, je visite des usines et je passe des appels ; la nuit, je construis des outils : une plateforme locale qui expose Fumamx en CLI/REST/MCP, une plateforme d’appels sortants et quelques clients locaux pour les job boards. Je crois aux choses qui rapportent à partir d’un seul investissement, et aux intérêts composés lents.',
      de: 'Tagsüber spreche ich mit Kunden, besuche Fabriken und telefoniere; nachts baue ich Werkzeuge: eine lokale Plattform, die Fumamx als CLI/REST/MCP bereitstellt, eine Outbound-Call-Plattform und einige lokale Clients für Jobbörsen und Akquise. Ich glaube an Dinge, die sich aus einer Investition dauerhaft auszahlen – und an langsames Compounding.',
    },
  ] as L[],

  /** Longer, more reflective bio used on the About page. */
  aboutBio: [
    {
      zh: '我学的是物联网工程，硬件和软件都碰过，但真正让我着迷的是「系统」——一件重复的事，能不能变成一次投入、长期产出的东西。大学里做网球社社长、写社团章程、做毕业设计捡球机器人，都是同一个问题的不同形态。',
      en: 'I studied IoT engineering — a bit of hardware, a bit of software — but what actually fascinates me is systems: can a repeated task become something you build once and benefit from for years? Running a tennis club, writing its constitution, and building a ball-collecting robot for my thesis were all the same question in different forms.',
      ja: 'IoT 工学を学び、ハードウェアとソフトウェアの両方に触れましたが、本当に惹かれたのは「システム」です。繰り返される作業を、一度の投資で長く効く仕組みに変えられるか。テニス部の部長、部の規約づくり、卒業研究の球拾いロボットは、どれも同じ問いの形を変えたものでした。',
      es: 'Estudié Ingeniería IoT —algo de hardware, algo de software—, pero lo que de verdad me fascina son los sistemas: ¿puede una tarea repetida convertirse en algo que construyes una vez y te rinde durante años? Dirigir un club de tenis, escribir sus estatutos y construir un robot recogepelotas para mi tesis fueron la misma pregunta con formas distintas.',
      fr: 'J’ai étudié l’ingénierie IoT — un peu de matériel, un peu de logiciel — mais ce qui me fascine vraiment, ce sont les systèmes : une tâche répétée peut-elle devenir quelque chose que l’on construit une fois et qui rapporte pendant des années ? Diriger un club de tennis, écrire ses statuts et construire un robot ramasseur de balles pour mon mémoire, c’était la même question sous des formes différentes.',
      de: 'Ich habe IoT-Technik studiert – etwas Hardware, etwas Software –, aber wirklich fasziniert mich Systemdenken: Kann eine wiederkehrende Aufgabe zu etwas werden, das man einmal baut und jahrelang davon profitiert? Den Tennisclub zu leiten, seine Satzung zu schreiben und für die Abschlussarbeit einen Ballroboter zu bauen, waren dieselbe Frage in verschiedenen Formen.',
    },
    {
      zh: '2026 年春天，我在燕山华云做 AI 实施实习：做招聘中枢的产品设计、企业 AI 基建选型，给客户做培训和售前方案。那段经历让我确认了一件事——大部分企业不缺模型，缺的是把模型接进业务流程的人。',
      en: 'In the spring of 2026 I interned in AI implementation: product design for a recruiting hub, technology selection for enterprise AI infrastructure, and training and pre-sales for customers. That experience confirmed one thing for me — most companies don’t lack models, they lack people who can wire models into real business processes.',
      ja: '2026 年春、AI 導入のインターンとして、採用ハブのプロダクト設計、企業 AI 基盤の技術選定、顧客向けの研修とプリセールスを担当しました。そこで確信したのは、多くの企業に足りないのはモデルではなく、モデルを業務プロセスに接続する人だということです。',
      es: 'En la primavera de 2026 hice prácticas en implantación de IA: diseño de producto para un hub de reclutamiento, selección de infraestructura de IA empresarial, y formación y preventa para clientes. Esa experiencia me confirmó una cosa: a la mayoría de las empresas no les faltan modelos, les falta gente capaz de conectarlos a procesos reales.',
      fr: 'Au printemps 2026, j’ai fait un stage en déploiement d’IA : conception produit d’un hub de recrutement, choix d’infrastructure IA, formation et avant-vente. Cette expérience m’a confirmé une chose : la plupart des entreprises ne manquent pas de modèles, elles manquent de gens capables de les brancher à de vrais processus métier.',
      de: 'Im Frühjahr 2026 habe ich ein Praktikum im Bereich KI-Implementierung gemacht: Produktdesign für einen Recruiting-Hub, Technologieauswahl für KI-Infrastruktur sowie Schulungen und Pre-Sales für Kunden. Diese Erfahrung hat eines bestätigt: Den meisten Unternehmen fehlen keine Modelle, sondern Menschen, die Modelle in echte Geschäftsprozesse einbinden können.',
    },
    {
      zh: '毕业后我加入孚盟软件做客户经理。这份工作离客户最近，也离重复劳动最近，所以我开始给自己造工具：一个把孚盟网页端封装成 CLI/REST/MCP 的本地平台，一个把外呼、录音、转写、跟进串起来的外呼平台。白天用它们工作，晚上继续改它们。',
      en: 'After graduating I joined Fumamx as an account manager. That job is closest to customers — and closest to repetitive work — so I started building my own tools: a local platform that exposes Fumamx’s web app as CLI/REST/MCP, and an outbound platform that connects calling, recording, transcription and follow-up. I use them during the day and keep improving them at night.',
      ja: '卒業後は Fumamx でアカウントマネージャーとして働いています。顧客に最も近く、同時に繰り返し作業にも最も近い仕事なので、自分のためのツールを作り始めました。Fumamx の Web 画面を CLI/REST/MCP にするローカル基盤と、架電・録音・文字起こし・フォローを繋ぐアウトバウンド基盤です。昼はそれを使い、夜は改良しています。',
      es: 'Tras graduarme me uní a Fumamx como gestor de cuentas. Es el trabajo más cercano al cliente y también al trabajo repetitivo, así que empecé a construir mis propias herramientas: una plataforma local que expone la web de Fumamx como CLI/REST/MCP y una plataforma de llamadas que conecta llamada, grabación, transcripción y seguimiento. Las uso de día y las mejoro de noche.',
      fr: 'Après mon diplôme, j’ai rejoint Fumamx comme responsable de comptes. C’est le poste le plus proche des clients — et du travail répétitif — alors j’ai commencé à construire mes propres outils : une plateforme locale qui expose l’application web de Fumamx en CLI/REST/MCP, et une plateforme d’appels qui relie appel, enregistrement, transcription et suivi. Je les utilise le jour et les améliore la nuit.',
      de: 'Nach dem Abschluss bin ich als Account Manager zu Fumamx gekommen. Dieser Job ist den Kunden am nächsten – und der repetitiven Arbeit. Also begann ich, mir eigene Werkzeuge zu bauen: eine lokale Plattform, die Fumamx als CLI/REST/MCP bereitstellt, und eine Outbound-Plattform, die Anruf, Aufnahme, Transkription und Nachverfolgung verbindet. Tagsüber nutze ich sie, nachts verbessere ich sie.',
    },
  ] as L[],

  /** "Now" block — what I'm focused on at the moment. */
  now: [
    {
      zh: '在孚盟做客户经理，同时维护一套自建的销售自动化工具链；重读数学（Apostol）与系统工程；每周打两次网球。',
      en: 'Working as an account manager at Fumamx while maintaining a self-built sales automation toolchain; rereading Apostol’s calculus and systems engineering; playing tennis twice a week.',
      ja: 'Fumamx でアカウントマネージャーをしながら、自作の営業自動化ツール群を保守しています。Apostol の微積分とシステム工学を読み直し、週に二回テニスをしています。',
      es: 'Trabajo como gestor de cuentas en Fumamx y mantengo una cadena de herramientas propias de automatización comercial; releo cálculo de Apostol e ingeniería de sistemas; juego al tenis dos veces por semana.',
      fr: 'Je travaille comme responsable de comptes chez Fumamx et maintiens ma propre chaîne d’outils d’automatisation commerciale ; je relis le calcul d’Apostol et l’ingénierie système ; je joue au tennis deux fois par semaine.',
      de: 'Ich arbeite als Account Manager bei Fumamx und pflege meine selbst gebaute Vertriebsautomatisierung; ich lese Apostols Analysis und Systems Engineering erneut; zweimal pro Woche spiele ich Tennis.',
    },
  ] as L[],

  /**
   * Short CV rows for the About page. The full story lives on the Timeline page.
   * `end: null` means "Present".
   */
  experience: [
    { org: 'Fumamx', role: { en: 'Account Manager', zh: '客户经理' } as L, start: '2026', end: null },
    { org: 'Yanshan Huayun', role: { en: 'AI Implementation Intern', zh: 'AI 实施实习生' } as L, start: '2026', end: '2026' },
    { org: 'Hebei University of Engineering Technology', role: { en: 'B.Eng. Internet of Things Engineering', zh: '物联网工程 学士' } as L, start: '2022', end: '2026' },
    { org: 'Tennis Club', role: { en: 'President', zh: '社长' } as L, start: '2025', end: '2025' },
  ],

  /** "Elsewhere" links shown on About. */
  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/CindyRIng' },
    { label: 'Email', href: 'mailto:cindyring_dream@outlook.com' },
  ],

  /** Colophon facts — how the site is made. */
  colophon: [
    {
      zh: '设计与代码全部手写：Astro 7 + Tailwind CSS 4 + TypeScript，静态输出，没有前端框架。',
      en: 'Designed and coded by hand: Astro 7 + Tailwind CSS 4 + TypeScript, static output, no front-end framework.',
      ja: 'デザインもコードも手書き：Astro 7 + Tailwind CSS 4 + TypeScript、静的出力、フロントエンドフレームワークなし。',
      es: 'Diseñado y programado a mano: Astro 7 + Tailwind CSS 4 + TypeScript, salida estática, sin framework de front-end.',
      fr: 'Conçu et codé à la main : Astro 7 + Tailwind CSS 4 + TypeScript, sortie statique, sans framework front-end.',
      de: 'Von Hand gestaltet und programmiert: Astro 7 + Tailwind CSS 4 + TypeScript, statische Ausgabe, ohne Frontend-Framework.',
    },
    {
      zh: '字体自托管：Source Serif 4 / Inter / JetBrains Mono；六种语言的页面由同一套模板生成。',
      en: 'Self-hosted fonts: Source Serif 4 / Inter / JetBrains Mono. All six languages are generated from the same templates.',
      ja: 'フォントはセルフホスト：Source Serif 4 / Inter / JetBrains Mono。6 言語のページを同じテンプレートから生成しています。',
      es: 'Tipografías autoalojadas: Source Serif 4 / Inter / JetBrains Mono. Los seis idiomas se generan con las mismas plantillas.',
      fr: 'Polices auto-hébergées : Source Serif 4 / Inter / JetBrains Mono. Les six langues sont générées à partir des mêmes gabarits.',
      de: 'Selbst gehostete Schriften: Source Serif 4 / Inter / JetBrains Mono. Alle sechs Sprachen entstehen aus denselben Templates.',
    },
    {
      zh: '排版语言致敬 paulstamatiou.com——暖纸、墨色、窄栏与克制的动效。',
      en: 'The typographic language is an homage to paulstamatiou.com — warm paper, ink, a narrow measure and restrained motion.',
      ja: 'タイポグラフィの言語は paulstamatiou.com へのオマージュ——暖かな紙、インク、細い段組み、抑制された動き。',
      es: 'El lenguaje tipográfico es un homenaje a paulstamatiou.com: papel cálido, tinta, medida estrecha y movimiento contenido.',
      fr: 'Le langage typographique est un hommage à paulstamatiou.com — papier chaud, encre, colonne étroite et mouvement retenu.',
      de: 'Die typografische Sprache ist eine Hommage an paulstamatiou.com – warmes Papier, Tinte, schmale Spalte und zurückhaltende Bewegung.',
    },
  ] as L[],

  /** Origin of the footer's "handcrafted for N months" counter — the first sketch of this site. */
  siteLaunch: '2026-07-14',

  /**
   * SEO defaults (title is derived per-locale in BaseLayout from name + role).
   */
  seo: {
    description: {
      zh: '宋谦，孚盟软件客户经理，2026 届物联网工程毕业生。白天做外贸 SaaS 销售，晚上把销售流程写成软件。',
      en: 'Song Qian is an account manager at Fumamx in Shijiazhuang and a 2026 IoT engineering graduate — selling foreign-trade SaaS by day, building AI workflow tools by night.',
      ja: '宋谦は石家荘の Fumamx のアカウントマネージャーで、2026 年に IoT 工学を卒業。昼は海外貿易 SaaS を売り、夜は AI ワークフローのツールを作ります。',
      es: 'Song Qian es gestor de cuentas en Fumamx (Shijiazhuang) y graduado en Ingeniería IoT en 2026: vende SaaS para comercio exterior y construye herramientas de flujos con IA.',
      fr: 'Song Qian est responsable de comptes chez Fumamx à Shijiazhuang et diplômé en ingénierie IoT en 2026 : il vend du SaaS pour le commerce international et construit des outils de workflows IA.',
      de: 'Song Qian ist Account Manager bei Fumamx in Shijiazhuang und Absolvent der IoT-Technik 2026: tagsüber Außenhandels-SaaS, nachts KI-Workflow-Tools.',
    } as L,
  },
} as const;

export type Profile = typeof profile;
