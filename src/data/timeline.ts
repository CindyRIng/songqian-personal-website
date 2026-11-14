/**
 * TIMELINE — the chronological spine of the site (Timeline page + home preview).
 *
 * TODO(content-owner): This is a realistic PLACEHOLDER career for a Shanghai
 * product designer, 2014 → now. Replace with Song Qian's real history when the
 * real CV arrives. Keep the shape of the data identical:
 *   start/end are `YYYY-MM` strings, `end: null` means "Present".
 *
 * Every human-readable field is a localized map (`L`): `en` and `zh` are
 * authoritative, `ja` / `es` / `fr` / `de` are best-effort translations.
 * Order matters only for humans: the array is already newest-first, and
 * `getTimeline()` re-sorts defensively.
 */
import type { L } from './profile';
import type { Locale } from '../i18n/config';
import { formatMonth, useTranslations } from '../i18n/utils';

export const TIMELINE_TYPE_KEYS = {
  work: 'timeline.work',
  education: 'timeline.education',
  milestone: 'timeline.milestone',
  life: 'timeline.life',
} as const;

export type TimelineType = keyof typeof TIMELINE_TYPE_KEYS;

/** Types in the order they appear in the filter control. */
export const TIMELINE_TYPES: TimelineType[] = ['work', 'education', 'milestone', 'life'];

export interface TimelineEntry {
  /** Stable, URL-safe id — never localized. */
  id: string;
  type: TimelineType;
  /** `YYYY-MM` */
  start: string;
  /** `YYYY-MM` or null for "Present". */
  end: string | null;
  org: L;
  role: L;
  summary: L;
  highlights?: L[];
  location?: L;
  /** Locale-neutral tags (skills, media, tool names). */
  tags?: string[];
  link?: string;
}

/** A timeline entry resolved to strings for one locale. */
export interface ResolvedTimelineEntry {
  id: string;
  type: TimelineType;
  start: string;
  end: string | null;
  /** Start year, used for grouping. */
  year: number;
  /** Localized month-year labels, e.g. "Mar 2024". */
  startLabel: string;
  endLabel: string;
  /** Rendered period, e.g. "Mar 2024 — Present" / "Sep 2013 — Jun 2017". */
  period: string;
  /** True while `end` is null. */
  current: boolean;
  org: string;
  role: string;
  summary: string;
  highlights: string[];
  location?: string;
  tags: string[];
  link?: string;
}

export const timeline: TimelineEntry[] = [
  {
    id: 'site-launch',
    type: 'milestone',
    start: '2026-01',
    end: null,
    org: { en: 'Songqian.dev', zh: 'Songqian.dev', ja: 'Songqian.dev', es: 'Songqian.dev', fr: 'Songqian.dev', de: 'Songqian.dev' },
    role: {
      en: 'Designer & developer',
      zh: '设计与开发',
      ja: 'デザインと開発',
      es: 'Diseño y desarrollo',
      fr: 'Design et développement',
      de: 'Design und Entwicklung',
    },
    summary: {
      en: 'Launched a personal site built entirely by hand — no themes, no templates, six languages and one narrow column of warm cream paper.',
      zh: '上线了一个完全手写的个人网站——没有主题模板，六种语言，一栏温暖的米色纸面。',
      ja: '完全に手で作った個人サイトを公開。テーマもテンプレートもなく、6言語、温かいクリーム色の1カラム。',
      es: 'Lancé un sitio personal construido por completo a mano: sin temas ni plantillas, seis idiomas y una sola columna de papel crema y cálido.',
      fr: 'Mise en ligne d’un site personnel entièrement fait main : sans thème ni modèle, six langues, une seule colonne de papier crème et chaud.',
      de: 'Eine komplett von Hand gebaute persönliche Website veröffentlicht: keine Themes, keine Vorlagen, sechs Sprachen und eine schmale Spalte aus warmem Cremepapier.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Astro', 'Tailwind CSS', 'Typography'],
  },
  {
    id: 'field-notes-zine',
    type: 'milestone',
    start: '2025-10',
    end: '2025-10',
    org: { en: 'Field Notes, Vol. 1', zh: 'Field Notes, Vol. 1', ja: 'Field Notes, Vol. 1', es: 'Field Notes, Vol. 1', fr: 'Field Notes, Vol. 1', de: 'Field Notes, Vol. 1' },
    role: {
      en: 'Photographer & editor',
      zh: '摄影与编辑',
      ja: '写真と編集',
      es: 'Fotografía y edición',
      fr: 'Photographie et édition',
      de: 'Fotografie und Redaktion',
    },
    summary: {
      en: 'Self-published a 48-page photo zine of early-morning walks through Shanghai. The first print run sold out in three weeks.',
      zh: '自出版了一本 48 页的摄影小志，记录上海清晨的散步。首印三周内售罄。',
      ja: '上海の朝の散歩を記録した48ページの写真集を自主制作。初版は3週間で完売。',
      es: 'Autopubliqué un fanzine fotográfico de 48 páginas sobre mis paseos matutinos por Shanghái; la primera tirada se agotó en tres semanas.',
      fr: 'Auto-édition d’un fanzine photo de 48 pages sur mes promenades matinales à Shanghai ; le premier tirage s’est écoulé en trois semaines.',
      de: 'Ein 48-seitiges Fotozine über morgendliche Spaziergänge in Shanghai selbst veröffentlicht; die erste Auflage war nach drei Wochen vergriffen.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Photography', 'Print'],
  },
  {
    id: 'lumen-labs',
    type: 'work',
    start: '2024-03',
    end: null,
    org: { en: 'Lumen Labs', zh: 'Lumen Labs', ja: 'Lumen Labs', es: 'Lumen Labs', fr: 'Lumen Labs', de: 'Lumen Labs' },
    role: {
      en: 'Product Designer',
      zh: '产品设计师',
      ja: 'プロダクトデザイナー',
      es: 'Diseñadora de producto',
      fr: 'Designer produit',
      de: 'Produktdesignerin',
    },
    summary: {
      en: 'Designing an AI-native writing workspace — the editor, the prompts, and the quiet parts in between. First designer on the team.',
      zh: '设计一个 AI 原生的写作工作台——编辑器、提示词，以及两者之间那些安静的部分。团队的第一位设计师。',
      ja: 'AIネイティブな執筆ワークスペースをデザイン。エディタ、プロンプト、その間にある静かな部分。チーム最初のデザイナー。',
      es: 'Diseño un espacio de escritura nativo de IA: el editor, los prompts y las partes silenciosas entre ambos. Primera diseñadora del equipo.',
      fr: 'Je conçois un espace d’écriture natif IA : l’éditeur, les prompts et les parties silencieuses entre les deux. Première designer de l’équipe.',
      de: 'Ich gestalte einen KI-nativen Schreibarbeitsplatz: Editor, Prompts und die stillen Teile dazwischen. Erste Designerin im Team.',
    },
    highlights: [
      {
        en: 'Designed and shipped the editor’s core writing loop, from first sketch to public beta.',
        zh: '从第一张草图到公测，负责编辑器的核心写作流程。',
        ja: '最初のスケッチからパブリックベータまで、エディタの中核となる執筆体験を担当。',
        es: 'Diseñé y llevé el flujo central de escritura del editor, del primer boceto a la beta pública.',
        fr: 'Conçu et livré le cœur de l’écriture de l’éditeur, de la première esquisse à la bêta publique.',
        de: 'Den Kern-Schreibfluss des Editors von der ersten Skizze bis zur öffentlichen Beta gestaltet und ausgeliefert.',
      },
      {
        en: 'Built the product website and the first version of the design system.',
        zh: '搭建产品官网与设计系统的第一版。',
        ja: 'プロダクトサイトとデザインシステムの初期版を構築。',
        es: 'Construí el sitio del producto y la primera versión del sistema de diseño.',
        fr: 'Construit le site produit et la première version du design system.',
        de: 'Die Produktwebsite und die erste Version des Designsystems gebaut.',
      },
    ],
    location: {
      en: 'Shanghai, remote',
      zh: '上海 · 远程',
      ja: '上海・リモート',
      es: 'Shanghái, en remoto',
      fr: 'Shanghai, à distance',
      de: 'Shanghai, remote',
    },
    tags: ['AI', 'Product design', 'Front-end'],
  },
  {
    id: 'yunnan',
    type: 'life',
    start: '2024-01',
    end: '2024-02',
    org: {
      en: 'Yunnan, with a camera',
      zh: '云南，与一台相机',
      ja: '雲南、カメラとともに',
      es: 'Yunnan, con una cámara',
      fr: 'Yunnan, avec un appareil',
      de: 'Yunnan, mit einer Kamera',
    },
    role: { en: 'A month off', zh: '休息一个月', ja: '1か月の休暇', es: 'Un mes libre', fr: 'Un mois de pause', de: 'Ein Monat Auszeit' },
    summary: {
      en: 'Walked from Dali to Lijiang with one film camera and four rolls of Portra. Came home with the first notes for what became Field Notes.',
      zh: '带着一台胶片相机和四卷 Portra 从大理走到丽江。回来时带回了后来成为 Field Notes 的最初笔记。',
      ja: 'フィルムカメラ1台とポートラ4本で大理から麗江へ歩き、後にField Notesとなる最初のノートを持ち帰った。',
      es: 'Caminé de Dali a Lijiang con una cámara de carrete y cuatro rollos de Portra; volví con las primeras notas de lo que luego sería Field Notes.',
      fr: 'De Dali à Lijiang avec un appareil argentique et quatre pellicules Portra ; revenue avec les premières notes de ce qui deviendrait Field Notes.',
      de: 'Von Dali nach Lijiang gewandert, mit einer Filmkamera und vier Rollen Portra; mit den ersten Notizen für das spätere Field Notes zurückgekehrt.',
    },
    location: {
      en: 'Dali → Lijiang, Yunnan',
      zh: '云南 · 大理 → 丽江',
      ja: '雲南・大理 → 麗江',
      es: 'Dali → Lijiang, Yunnan',
      fr: 'Dali → Lijiang, Yunnan',
      de: 'Dali → Lijiang, Yunnan',
    },
    tags: ['Photography', 'Travel'],
  },
  {
    id: 'design-systems-shanghai',
    type: 'milestone',
    start: '2023-05',
    end: '2023-05',
    org: {
      en: 'Design Systems Shanghai',
      zh: 'Design Systems Shanghai',
      ja: 'Design Systems Shanghai',
      es: 'Design Systems Shanghai',
      fr: 'Design Systems Shanghai',
      de: 'Design Systems Shanghai',
    },
    role: { en: 'Speaker', zh: '演讲者', ja: '講演', es: 'Ponente', fr: 'Conférencière', de: 'Vortragende' },
    summary: {
      en: 'Gave a talk called “Tokens are a language” to ~200 designers about why naming things well is most of the work.',
      zh: '做了题为「Token 是一种语言」的分享，和约 200 位设计师聊为什么命名本身就是大部分工作。',
      ja: '「トークンは言語である」と題した講演を約200人のデザイナーの前で行い、名前を付けることこそ仕事の大半だと話した。',
      es: 'Di una charla titulada «Los tokens son un lenguaje» ante unos 200 diseñadores sobre por qué nombrar bien las cosas es casi todo el trabajo.',
      fr: 'Une conférence intitulée « Les tokens sont un langage » devant environ 200 designers, sur le fait que nommer correctement les choses, c’est presque tout le travail.',
      de: 'Vortrag „Tokens sind eine Sprache“ vor rund 200 Designerinnen und Designern darüber, dass gutes Benennen fast die ganze Arbeit ist.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Design systems', 'Public speaking'],
  },
  {
    id: 'tokenizer',
    type: 'milestone',
    start: '2022-04',
    end: '2022-04',
    org: { en: 'Tokenizer', zh: 'Tokenizer', ja: 'Tokenizer', es: 'Tokenizer', fr: 'Tokenizer', de: 'Tokenizer' },
    role: { en: 'Maker', zh: '独立开发者', ja: '作者', es: 'Creadora', fr: 'Créatrice', de: 'Macherin' },
    summary: {
      en: 'Released a small open-source Figma plugin that lints design tokens before they reach production. 3,000+ installs and still maintained.',
      zh: '发布了一个小型开源 Figma 插件，在 design token 进入生产环境前做校验。三千多次安装，至今仍在维护。',
      ja: 'デザイントークンを本番前に検査する小さなオープンソースFigmaプラグインを公開。3,000以上のインストール、今も維持。',
      es: 'Publiqué un pequeño plugin de Figma de código abierto que revisa los design tokens antes de llegar a producción. Más de 3.000 instalaciones y sigue mantenido.',
      fr: 'Publication d’un petit plugin Figma open source qui vérifie les design tokens avant la production. Plus de 3 000 installations, toujours maintenu.',
      de: 'Ein kleines Open-Source-Figma-Plugin veröffentlicht, das Design-Tokens vor dem Produktivgang prüft. Über 3.000 Installationen, bis heute gepflegt.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Open source', 'Figma', 'Design systems'],
  },
  {
    id: 'meridian',
    type: 'work',
    start: '2021-04',
    end: '2024-02',
    org: { en: 'Meridian', zh: 'Meridian', ja: 'Meridian', es: 'Meridian', fr: 'Meridian', de: 'Meridian' },
    role: {
      en: 'Senior Product Designer, Design Systems',
      zh: '高级产品设计师，设计系统',
      ja: 'シニアプロダクトデザイナー（デザインシステム）',
      es: 'Diseñadora de producto sénior, sistemas de diseño',
      fr: 'Designer produit senior, design systems',
      de: 'Senior Produktdesignerin, Designsysteme',
    },
    summary: {
      en: 'Owned the design system for a fintech platform used by 40+ product teams: foundations, tokens, documentation, and the governance that keeps it alive.',
      zh: '负责一个服务 40+ 产品团队的金融科技平台设计系统——基础规范、token、文档，以及让它持续运转的治理机制。',
      ja: '40以上のプロダクトチームが使うフィンテック基盤のデザインシステムを担当。基盤、トークン、ドキュメント、そしてそれを生かすガバナンス。',
      es: 'Responsable del sistema de diseño de una plataforma fintech usada por más de 40 equipos de producto: fundamentos, tokens, documentación y la gobernanza que lo mantiene vivo.',
      fr: 'Responsable du design system d’une plateforme fintech utilisée par plus de 40 équipes produit : fondations, tokens, documentation et la gouvernance qui le fait vivre.',
      de: 'Verantwortlich für das Designsystem einer Fintech-Plattform, die von über 40 Produktteams genutzt wird: Grundlagen, Tokens, Dokumentation und die Governance, die es am Leben hält.',
    },
    highlights: [
      {
        en: 'Rebuilt the token architecture across web and iOS, cutting spec time by roughly half.',
        zh: '重建了 Web 与 iOS 的 token 架构，把设计交付时间缩短约一半。',
        ja: 'WebとiOSのトークン設計を作り直し、仕様作成の時間を約半分に短縮。',
        es: 'Reconstruí la arquitectura de tokens en web e iOS, reduciendo a la mitad el tiempo de especificación.',
        fr: 'Refonte de l’architecture des tokens sur le web et iOS, réduisant de moitié le temps de spécification.',
        de: 'Die Token-Architektur für Web und iOS neu aufgebaut und die Spezifikationszeit etwa halbiert.',
      },
      {
        en: 'Wrote and maintained the public documentation site used by every product team.',
        zh: '编写并维护所有产品团队都在使用的公共文档站。',
        ja: '全プロダクトチームが使う公開ドキュメントサイトを執筆・維持。',
        es: 'Escribí y mantuve el sitio de documentación pública que usa cada equipo de producto.',
        fr: 'Rédaction et maintenance du site de documentation publique utilisé par toutes les équipes produit.',
        de: 'Die öffentliche Dokumentationsseite geschrieben und gepflegt, die alle Produktteams nutzen.',
      },
    ],
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Design systems', 'Fintech', 'Documentation'],
  },
  {
    id: 'film-photography',
    type: 'life',
    start: '2020-08',
    end: null,
    org: {
      en: 'Film photography',
      zh: '胶片摄影',
      ja: 'フィルム写真',
      es: 'Fotografía analógica',
      fr: 'Photographie argentique',
      de: 'Analogfotografie',
    },
    role: { en: 'An ongoing practice', zh: '持续的练习', ja: '続けている習慣', es: 'Práctica continua', fr: 'Pratique continue', de: 'Fortlaufende Praxis' },
    summary: {
      en: 'Bought a used Olympus XA and started carrying it everywhere — a slower, more deliberate way of looking at ordinary mornings.',
      zh: '买了一台二手 Olympus XA，开始随身携带——一种更慢、更刻意地观看寻常清晨的方式。',
      ja: '中古のOlympus XAを買って常に持ち歩くように。何でもない朝を、よりゆっくり、意図的に見る方法。',
      es: 'Compré una Olympus XA de segunda mano y empecé a llevarla siempre; una forma más lenta y deliberada de mirar las mañanas corrientes.',
      fr: 'Achat d’un Olympus XA d’occasion, toujours dans le sac ; une façon de regarder les matins ordinaires plus lente et plus délibérée.',
      de: 'Eine gebrauchte Olympus XA gekauft und immer dabei; eine langsamere, bewusstere Art, gewöhnliche Morgen zu betrachten.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Photography'],
  },
  {
    id: 'fieldnote',
    type: 'work',
    start: '2019-05',
    end: '2021-03',
    org: { en: 'Fieldnote', zh: 'Fieldnote', ja: 'Fieldnote', es: 'Fieldnote', fr: 'Fieldnote', de: 'Fieldnote' },
    role: {
      en: 'Product Designer',
      zh: '产品设计师',
      ja: 'プロダクトデザイナー',
      es: 'Diseñadora de producto',
      fr: 'Designer produit',
      de: 'Produktdesignerin',
    },
    summary: {
      en: 'Designed a mobile-first field research tool for academics. Learned to ship weekly and to interview people who don’t use design tools.',
      zh: '为学术研究者设计了一款移动优先的田野调查工具。学会了每周交付，也学会了采访那些不使用设计工具的人。',
      ja: '研究者向けのモバイルファーストなフィールド調査ツールをデザイン。毎週リリースすること、デザインツールを使わない人に話を聞くことを学んだ。',
      es: 'Diseñé una herramienta de investigación de campo, mobile-first, para académicos; aprendí a entregar cada semana y a entrevistar a gente que no usa herramientas de diseño.',
      fr: 'Conception d’un outil de recherche de terrain mobile-first pour des universitaires ; appris à livrer chaque semaine et à interroger des gens qui n’utilisent pas d’outils de design.',
      de: 'Ein mobil-first Werkzeug für Feldforschung für Wissenschaftler gestaltet; gelernt, wöchentlich zu liefern und Menschen zu befragen, die keine Designwerkzeuge nutzen.',
    },
    highlights: [
      {
        en: 'Owned mobile design end to end, from research plans to the shipped iOS app.',
        zh: '端到端负责移动端设计，从研究计划到上线的 iOS 应用。',
        ja: '調査計画からリリースされたiOSアプリまで、モバイルデザインを一貫して担当。',
        es: 'Responsable de todo el diseño móvil, desde los planes de investigación hasta la app iOS publicada.',
        fr: 'Responsable du design mobile de bout en bout, des plans de recherche à l’app iOS livrée.',
        de: 'Das mobile Design von Anfang bis Ende verantwortet, von Forschungsplänen bis zur ausgelieferten iOS-App.',
      },
      {
        en: 'Introduced a lightweight design review ritual the team kept for years.',
        zh: '引入了一种轻量的设计评审习惯，团队沿用了多年。',
        ja: 'チームが長く続けた軽いデザインレビューの習慣を導入。',
        es: 'Introduje una rutina ligera de revisión de diseño que el equipo mantuvo durante años.',
        fr: 'Introduction d’un rituel de revue de design léger que l’équipe a gardé pendant des années.',
        de: 'Ein leichtes Design-Review-Ritual eingeführt, das das Team jahrelang beibehielt.',
      },
    ],
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Mobile', 'Research'],
  },
  {
    id: 'independent',
    type: 'work',
    start: '2017-07',
    end: '2019-04',
    org: { en: 'Independent', zh: '独立执业', ja: '独立', es: 'Independiente', fr: 'Indépendante', de: 'Selbstständig' },
    role: {
      en: 'Freelance designer & developer',
      zh: '自由设计师 / 开发者',
      ja: 'フリーランスデザイナー / 開発者',
      es: 'Diseñadora y desarrolladora freelance',
      fr: 'Designer et développeuse indépendante',
      de: 'Freelance-Designerin und -Entwicklerin',
    },
    summary: {
      en: 'Three years of client work — brand sites, small web apps and one memorable museum kiosk. Learned to scope, price and deliver.',
      zh: '三年客户项目——品牌网站、小型 Web 应用，还有一个难忘的博物馆互动装置。学会了界定范围、报价与交付。',
      ja: '3年間のクライアントワーク。ブランドサイト、小さなWebアプリ、そして忘れられない美術館のキオスク。範囲を決め、価格を付け、届けることを学んだ。',
      es: 'Tres años de trabajo con clientes: sitios de marca, pequeñas apps web y un kiosco de museo memorable. Aprendí a definir alcance, presupuestar y entregar.',
      fr: 'Trois ans de projets clients : sites de marque, petites applications web et une borne de musée mémorable. Appris à cadrer, chiffrer et livrer.',
      de: 'Drei Jahre Kundenarbeit: Markenwebsites, kleine Web-Apps und ein denkwürdiger Museums-Kiosk. Gelernt, Umfang zu klären, zu kalkulieren und zu liefern.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Freelance', 'Web'],
  },
  {
    id: 'tongji-degree',
    type: 'education',
    start: '2013-09',
    end: '2017-06',
    org: {
      en: 'Tongji University',
      zh: '同济大学',
      ja: '同済大学',
      es: 'Universidad de Tongji',
      fr: 'Université de Tongji',
      de: 'Tongji-Universität',
    },
    role: {
      en: 'B.A. Visual Communication Design',
      zh: '视觉传达设计 学士',
      ja: '視覚伝達デザイン 学士',
      es: 'Licenciatura en Diseño de Comunicación Visual',
      fr: 'Licence en design de communication visuelle',
      de: 'B.A. Visuelle Kommunikation',
    },
    summary: {
      en: 'Focused on typography and editorial design; spent more time in the letterpress workshop than the render farm.',
      zh: '专注字体排印与编辑设计；在活版印刷工坊待的时间比在渲染农场还长。',
      ja: 'タイポグラフィとエディトリアルデザインを専攻。レンダリングファームより活版印刷工房に長くいた。',
      es: 'Me centré en tipografía y diseño editorial; pasé más tiempo en el taller de impresión tipográfica que en la granja de render.',
      fr: 'Spécialisée en typographie et design éditorial ; plus de temps à l’atelier de typographie qu’à la ferme de rendu.',
      de: 'Schwerpunkt Typografie und Editorial Design; mehr Zeit in der Buchdruckwerkstatt als im Renderpark.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Typography', 'Editorial'],
  },
  {
    id: 'aalto-exchange',
    type: 'education',
    start: '2015-08',
    end: '2015-12',
    org: {
      en: 'Aalto University',
      zh: '阿尔托大学',
      ja: 'アールト大学',
      es: 'Universidad Aalto',
      fr: 'Université Aalto',
      de: 'Aalto-Universität',
    },
    role: {
      en: 'Exchange semester, Visual Communication Design',
      zh: '交换学期，视觉传达设计',
      ja: '交換留学（視覚伝達デザイン）',
      es: 'Semestre de intercambio, Diseño de Comunicación Visual',
      fr: 'Semestre d’échange, design de communication visuelle',
      de: 'Austauschsemester, Visuelle Kommunikation',
    },
    summary: {
      en: 'A semester in Helsinki with a very quiet, very rigorous typography department. Learned to defend every decision.',
      zh: '在赫尔辛基交换一学期，师从一个非常安静、非常严格的字体排印系。学会了为每一个决定辩护。',
      ja: 'ヘルシンキで1学期。とても静かで厳格なタイポグラフィ学科で学び、すべての判断を説明できるようになった。',
      es: 'Un semestre en Helsinki con un departamento de tipografía muy silencioso y muy riguroso. Aprendí a defender cada decisión.',
      fr: 'Un semestre à Helsinki dans un département de typographie très silencieux et très rigoureux. Appris à défendre chaque décision.',
      de: 'Ein Semester in Helsinki in einer sehr stillen, sehr strengen Typografieabteilung. Gelernt, jede Entscheidung zu verteidigen.',
    },
    location: {
      en: 'Helsinki, Finland',
      zh: '赫尔辛基，芬兰',
      ja: 'ヘルシンキ、フィンランド',
      es: 'Helsinki, Finlandia',
      fr: 'Helsinki, Finlande',
      de: 'Helsinki, Finnland',
    },
    tags: ['Typography', 'Exchange'],
  },
  {
    id: 'fine-print-intern',
    type: 'work',
    start: '2014-06',
    end: '2014-09',
    org: { en: 'Fine Print Studio', zh: 'Fine Print Studio', ja: 'Fine Print Studio', es: 'Fine Print Studio', fr: 'Fine Print Studio', de: 'Fine Print Studio' },
    role: { en: 'Design intern', zh: '设计实习生', ja: 'デザインインターン', es: 'Becaria de diseño', fr: 'Stagiaire en design', de: 'Design-Praktikantin' },
    summary: {
      en: 'First job in a real studio: kerning business cards, cutting foam-core, and learning how deadlines actually work.',
      zh: '第一份真正的设计工作室工作：调字距、裁泡沫板，并搞明白截止日期到底是怎么运作的。',
      ja: '初めてのスタジオ仕事。名刺のカーニング、スチレンボードの裁断、そして締め切りが実際にどう動くのかを学んだ。',
      es: 'Mi primer trabajo en un estudio real: ajustar el interletraje de tarjetas, cortar cartón pluma y entender cómo funcionan de verdad los plazos.',
      fr: 'Premier vrai travail en studio : crénage de cartes de visite, découpe de carton mousse et compréhension du fonctionnement réel des délais.',
      de: 'Erster Job in einem echten Studio: Visitenkarten kerning, Schaumstoffplatten schneiden und verstehen, wie Deadlines wirklich funktionieren.',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国 · 上海',
      ja: '中国・上海',
      es: 'Shanghái, China',
      fr: 'Shanghai, Chine',
      de: 'Shanghai, China',
    },
    tags: ['Branding'],
  },
];

/** `YYYY-MM` → sortable number (year * 100 + month). */
function monthValue(value: string): number {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return 0;
  return Number(match[1]) * 100 + Number(match[2]);
}

function pick(value: L, lang: Locale): string {
  return value[lang] ?? value.en ?? '';
}

/**
 * Resolve the whole timeline for one locale: localized strings, formatted
 * month labels and a rendered period, sorted newest-first.
 */
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
        highlights: (entry.highlights ?? []).map((highlight) => pick(highlight, lang)),
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
    if (current && current.year === entry.year) {
      current.entries.push(entry);
    } else {
      groups.push({ year: entry.year, entries: [entry] });
    }
  }
  return groups;
}

/** Integer count of entries per type — used by the quiet filter labels. */
export function countTimelineByType(entries: ResolvedTimelineEntry[]): Record<TimelineType, number> {
  const counts = { work: 0, education: 0, milestone: 0, life: 0 } as Record<TimelineType, number>;
  for (const entry of entries) counts[entry.type] += 1;
  return counts;
}
