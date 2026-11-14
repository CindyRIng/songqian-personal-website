/**
 * TIMELINE — the chronological spine of the site (Timeline page + home preview).
 *
 * start/end are `YYYY-MM` strings, `end: null` means "Present". Every
 * human-readable field is a localized map (`L`), with `en` and `zh`
 * authoritative. The array is newest-first; `getTimeline()` re-sorts defensively.
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
  /** Show this entry in the About page's short CV ledger (default: false). */
  cv?: boolean;
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
    start: '2026-11',
    end: null,
    org: { en: 'Personal site', zh: '个人网站', ja: '個人サイト', es: 'Sitio personal', fr: 'Site personnel', de: 'Persönliche Website' },
    role: { en: 'Design & development', zh: '设计与开发', ja: 'デザインと開発', es: 'Diseño y desarrollo', fr: 'Design et développement', de: 'Design und Entwicklung' },
    summary: { en: 'Turned a July sketch into a six-language, 84-page static site.', zh: '把这个站从一份 7 月的草图，变成六种语言、84 个页面的静态站点。', ja: '7月のスケッチを6言語・84ページの静的サイトに。', es: 'Convertí un boceto de julio en un sitio estático de 84 páginas y seis idiomas.', fr: 'J’ai transformé un croquis de juillet en un site statique de 84 pages et six langues.', de: 'Aus einer Skizze vom Juli wurde eine statische Website mit 84 Seiten und sechs Sprachen.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Astro', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'canton-fair-sop',
    type: 'work',
    start: '2026-10',
    end: '2026-10',
    org: { en: 'Fumamx', zh: 'Fumamx', ja: 'Fumamx', es: 'Fumamx', fr: 'Fumamx', de: 'Fumamx' },
    role: { en: 'Account manager', zh: '客户经理', ja: 'アカウントマネージャー', es: 'Gestor de cuentas', fr: 'Responsable de comptes', de: 'Account Manager' },
    summary: { en: 'Broke the Canton Fair sales process into executable SOPs, a call tree and an assessment standard.', zh: '把广交会的展会销售拆成可执行的 SOP、话术树与考核标准。', ja: '広州交易会の営業プロセスを実行可能なSOP・トークツリー・評価基準に分解。', es: 'Dividí el proceso de ventas de la Feria de Cantón en SOP ejecutables, un árbol de llamadas y criterios de evaluación.', fr: 'J’ai décomposé le processus de vente de la Foire de Canton en SOP exécutables, un arbre d’appels et un référentiel d’évaluation.', de: 'Ich habe den Vertriebsprozess der Canton Fair in ausführbare SOPs, einen Gesprächsbaum und Bewertungskriterien zerlegt.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Sales', 'SOP', 'AI'],
  },
  {
    id: 'sales-toolchain',
    type: 'work',
    start: '2026-08',
    end: null,
    org: { en: 'Independent', zh: '独立项目', ja: '個人プロジェクト', es: 'Proyecto independiente', fr: 'Projet indépendant', de: 'Unabhängiges Projekt' },
    role: { en: 'Design & development', zh: '设计与开发', ja: 'デザインと開発', es: 'Diseño y desarrollo', fr: 'Design et développement', de: 'Design und Entwicklung' },
    summary: { en: 'A local Fumamx platform, an outbound-calling platform, and local clients for BOSS, Zhilian and Tanji — turning repetitive sales work into programmable interfaces.', zh: '孚盟本地封装平台、飞鸽外呼平台，以及 BOSS／智联／探迹的本地客户端——把销售的重复劳动变成可编程接口。', ja: 'Fumamxのローカル基盤、コールアウト基盤、BOSS／智联／探迹のローカルクライアント——営業の繰り返し作業をプログラマブルなAPIに。', es: 'Una plataforma local de Fumamx, una plataforma de llamadas salientes y clientes locales para BOSS, Zhilian y Tanji: convierto el trabajo repetitivo en interfaces programables.', fr: 'Une plateforme locale Fumamx, une plateforme d’appels sortants et des clients locaux pour BOSS, Zhilian et Tanji : transformer le travail répétitif en interfaces programmables.', de: 'Eine lokale Fumamx-Plattform, eine Outbound-Plattform und lokale Clients für BOSS, Zhilian und Tanji – repetitive Vertriebsarbeit als programmierbare Schnittstellen.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['TypeScript', 'MCP', 'Automation'],
  },
  {
    id: 'fumamx-account-manager',
    cv: true,
    type: 'work',
    start: '2026-07',
    end: null,
    org: { en: 'Fumamx', zh: 'Fumamx', ja: 'Fumamx', es: 'Fumamx', fr: 'Fumamx', de: 'Fumamx' },
    role: { en: 'Account manager', zh: '客户经理', ja: 'アカウントマネージャー', es: 'Gestor de cuentas', fr: 'Responsable de comptes', de: 'Account Manager' },
    summary: { en: 'Joined Fumamx as an account manager for foreign-trade SaaS — the closest seat to customers, and to repetitive work.', zh: '加入孚盟软件做外贸 SaaS 的客户经理：每天离客户最近，也离重复劳动最近。', ja: 'Fumamxに入社し海外貿易SaaSのアカウントマネージャーに。顧客に最も近く、繰り返し作業にも最も近い仕事。', es: 'Me uní a Fumamx como gestor de cuentas de SaaS para comercio exterior: el puesto más cercano al cliente y al trabajo repetitivo.', fr: 'J’ai rejoint Fumamx comme responsable de comptes SaaS pour le commerce international : au plus près des clients et du travail répétitif.', de: 'Ich bin bei Fumamx als Account Manager für Außenhandels-SaaS eingestiegen – am nächsten am Kunden und an repetitiver Arbeit.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Sales', 'SaaS'],
  },
  {
    id: 'graduation',
    type: 'milestone',
    start: '2026-06',
    end: '2026-06',
    org: { en: 'Hebei University of Engineering Technology', zh: '河北工程技术学院', ja: '河北工程技術学院', es: 'Universidad de Ingeniería de Hebei', fr: 'Université d’ingénierie du Hebei', de: 'Hebei-Universität für Ingenieurtechnik' },
    role: { en: 'B.Eng. Internet of Things Engineering', zh: '物联网工程 · 学士', ja: 'IoT工学・学士', es: 'Grado en Ingeniería IoT', fr: 'Diplôme d’ingénieur IoT', de: 'B.Eng. IoT-Technik' },
    summary: { en: 'Graduated. In four years I ran a tennis club, wrote ten-plus club regulations and finished a ball-collecting robot.', zh: '本科毕业。四年里做过网球社长、写过十余部社团条例、也做完了一台捡球机器人。', ja: '大学卒業。4年間でテニス部の部長を務め、10以上の部則を書き、球拾いロボットを完成させました。', es: 'Graduado. En cuatro años dirigí un club de tenis, escribí más de diez reglamentos y terminé un robot recogepelotas.', fr: 'Diplômé. En quatre ans, j’ai dirigé un club de tennis, écrit plus de dix règlements et terminé un robot ramasseur de balles.', de: 'Abschluss. In vier Jahren habe ich einen Tennisclub geleitet, über zehn Ordnungen geschrieben und einen Ballroboter fertiggestellt.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Graduation'],
  },
  {
    id: 'sales-team-experiment',
    type: 'milestone',
    start: '2026-06',
    end: '2026-06',
    org: { en: 'Three-person sales team', zh: '三人销售小组', ja: '3人の営業チーム', es: 'Equipo de ventas de tres', fr: 'Équipe de vente à trois', de: 'Dreiköpfiges Vertriebsteam' },
    role: { en: 'Sales & solutions', zh: '销售与方案', ja: '営業と提案', es: 'Ventas y soluciones', fr: 'Vente et solutions', de: 'Vertrieb und Lösungen' },
    summary: { en: 'A short three-person sales experiment: picking products, finding customers, quoting. Two months later we each chose a better-fitting path.', zh: '和两个伙伴做了一次小规模销售创业实验：选品、找客户、做报价。两个月后，各自回到更合适的路径。', ja: '3人で小さな営業スタートアップを試しました。商品選定、顧客開拓、見積作成。2か月後、それぞれに合う道へ。', es: 'Un breve experimento de ventas entre tres personas: elegir producto, buscar clientes y cotizar. Dos meses después cada uno eligió un camino más adecuado.', fr: 'Une brève expérience de vente à trois : choisir les produits, trouver des clients, chiffrer. Deux mois plus tard, chacun a choisi une voie plus juste.', de: 'Ein kurzes Vertriebsexperiment zu dritt: Produkte wählen, Kunden finden, Angebote erstellen. Nach zwei Monaten wählte jeder einen passenderen Weg.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Startup', 'Sales'],
  },
  {
    id: 'korea-partnership',
    type: 'milestone',
    start: '2026-05',
    end: '2026-05',
    org: { en: 'International education project', zh: '国际教育合作项目', ja: '国際教育協力プロジェクト', es: 'Proyecto internacional de educación', fr: 'Projet international d’éducation', de: 'Internationales Bildungsprojekt' },
    role: { en: 'Project lead', zh: '项目推进', ja: 'プロジェクト推進', es: 'Impulsor del proyecto', fr: 'Chef de projet', de: 'Projektleitung' },
    summary: { en: 'Helped host a Korean university delegation: reception, proposals, translation and follow-up.', zh: '参与韩国高校来访合作：接待、方案、翻译与后续落地推进。', ja: '韓国の大学訪問に参加：受け入れ、提案、通訳、その後の推進まで。', es: 'Ayudé a recibir a una delegación de una universidad coreana: recepción, propuestas, traducción y seguimiento.', fr: 'J’ai contribué à recevoir une délégation universitaire coréenne : accueil, propositions, traduction et suivi.', de: 'Ich half, eine koreanische Universitätsdelegation zu betreuen: Empfang, Konzepte, Übersetzung und Nachverfolgung.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Partnership'],
  },
  {
    id: 'ai-implementation-intern',
    cv: true,
    type: 'work',
    start: '2026-03',
    end: '2026-07',
    org: { en: 'Yanshan Huayun', zh: '燕山华云', ja: '燕山華雲', es: 'Yanshan Huayun', fr: 'Yanshan Huayun', de: 'Yanshan Huayun' },
    role: { en: 'AI implementation intern', zh: 'AI 实施实习生', ja: 'AI導入インターン', es: 'Becario de implantación de IA', fr: 'Stagiaire en déploiement IA', de: 'Praktikant KI-Implementierung' },
    summary: { en: 'Product design for a recruiting hub, AI infrastructure selection, customer training and pre-sales. Confirmed one thing: companies lack not models but people who wire them into processes.', zh: '做招聘中枢的产品设计、企业 AI 基建选型，给客户做培训与售前方案。确认了一件事：企业缺的不是模型，是把模型接进流程的人。', ja: '採用ハブのプロダクト設計、企業AI基盤の選定、顧客研修とプリセールス。確信したのは、企業に足りないのはモデルではなく、モデルを業務につなぐ人だということ。', es: 'Diseño de producto de un hub de reclutamiento, selección de infraestructura de IA, formación y preventa. Confirmé una cosa: a las empresas no les faltan modelos, sino gente que los conecte a procesos.', fr: 'Conception produit d’un hub de recrutement, choix d’infrastructure IA, formation et avant-vente. Une évidence : ce qui manque aux entreprises, ce ne sont pas les modèles, mais les gens qui les branchent aux processus.', de: 'Produktdesign für einen Recruiting-Hub, Auswahl von KI-Infrastruktur, Schulungen und Pre-Sales. Eine Erkenntnis: Es fehlen keine Modelle, sondern Menschen, die sie in Prozesse einbinden.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['AI', 'Product', 'Pre-sales'],
  },
  {
    id: 'thesis-robot',
    type: 'education',
    start: '2025-11',
    end: '2026-05',
    org: { en: 'Hebei University of Engineering Technology', zh: '河北工程技术学院', ja: '河北工程技術学院', es: 'Universidad de Ingeniería de Hebei', fr: 'Université d’ingénierie du Hebei', de: 'Hebei-Universität für Ingenieurtechnik' },
    role: { en: 'Thesis · solo developer', zh: '毕业设计 · 独立开发', ja: '卒業研究・単独開発', es: 'Tesis · desarrollo individual', fr: 'Mémoire · développement solo', de: 'Abschlussarbeit · Einzelentwicklung' },
    summary: { en: 'A tennis-ball-collecting robot: five-layer architecture, differential drive, roller pickup mechanism and 3D-printed structure.', zh: '网球捡球机器人：五层架构、两轮差速底盘、滚筒式拾球机构与 3D 打印结构。', ja: 'テニスボール回収ロボット：5層アーキテクチャ、差動二輪、ローラー式回収機構、3Dプリント構造。', es: 'Robot recogepelotas: arquitectura de cinco capas, tracción diferencial, mecanismo de recogida por rodillo y estructura impresa en 3D.', fr: 'Robot ramasseur de balles : architecture en cinq couches, traction différentielle, mécanisme de ramassage à rouleau et structure imprimée en 3D.', de: 'Tennisball-Sammelroboter: Fünf-Schichten-Architektur, Differentialantrieb, Rollenaufnahme und 3D-gedruckte Struktur.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['ROS', 'Embedded', '3D Printing'],
  },
  {
    id: 'reimbursement-system',
    type: 'work',
    start: '2025-08',
    end: '2025-08',
    org: { en: 'Campus project', zh: '校园项目', ja: 'キャンパスプロジェクト', es: 'Proyecto universitario', fr: 'Projet universitaire', de: 'Campus-Projekt' },
    role: { en: 'Design & development', zh: '设计与开发', ja: 'デザインと開発', es: 'Diseño y desarrollo', fr: 'Design et développement', de: 'Design und Entwicklung' },
    summary: { en: 'Built an online reimbursement approval system with smart forms, moving a paper process online.', zh: '用智能表单搭了一套线上报销审批系统，把纸质流程搬到线上。', ja: 'スマートフォームでオンライン経費精算システムを構築し、紙のプロセスをオンライン化。', es: 'Construí un sistema de aprobación de reembolsos con formularios inteligentes, llevando un proceso en papel a la web.', fr: 'J’ai construit un système d’approbation de notes de frais avec des formulaires intelligents, passant un processus papier en ligne.', de: 'Ich baute ein Online-Erstattungssystem mit intelligenten Formularen und brachte einen Papierprozess ins Netz.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Low-code', 'Automation'],
  },
  {
    id: 'tennis-club-president',
    cv: true,
    type: 'milestone',
    start: '2025-06',
    end: '2025-10',
    org: { en: 'Tennis Club', zh: '河工网球社', ja: 'テニス部', es: 'Club de tenis', fr: 'Club de tennis', de: 'Tennisclub' },
    role: { en: 'President', zh: '社长', ja: '部長', es: 'Presidente', fr: 'Président', de: 'Präsident' },
    summary: { en: 'Moved the club from personality-driven to rule-based: wrote a constitution and ten-plus regulations, built training, recruitment and handover processes.', zh: '带社团从人治走向制度：写下章程与十余部条例，建立训练方案、纳新与交接流程。', ja: '部を人治から制度へ：規約と10以上の条例を書き、練習計画・新歓・引き継ぎの流れを整備。', es: 'Llevé el club de lo personal a lo institucional: escribí unos estatutos y más de diez reglamentos, y monté procesos de entrenamiento, captación y traspaso.', fr: 'J’ai fait passer le club d’une logique personnelle à une logique de règles : statuts et plus de dix règlements, processus d’entraînement, de recrutement et de passation.', de: 'Ich führte den Club von Personen- zu Regelorientierung: Satzung und über zehn Ordnungen, Trainings-, Aufnahme- und Übergabeprozesse.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Leadership', 'Community'],
  },
  {
    id: 'knowledge-system',
    type: 'life',
    start: '2025-05',
    end: null,
    org: { en: 'Personal system', zh: '个人系统', ja: '個人システム', es: 'Sistema personal', fr: 'Système personnel', de: 'Persönliches System' },
    role: { en: 'Writer', zh: '写作者', ja: '書き手', es: 'Escritor', fr: 'Auteur', de: 'Autor' },
    summary: { en: 'Started managing knowledge in plain text and backlinks: diary, weekly reviews, a principles system, and turning experience into essays.', zh: '开始用纯文本与双链管理知识：日记、周复盘、原则系统，并把经验写成文章。', ja: 'プレーンテキストとバックリンクで知識管理を開始：日記、週次レビュー、原則システム、経験を文章に。', es: 'Empecé a gestionar conocimiento en texto plano y enlaces: diario, revisiones semanales, un sistema de principios y convertir experiencia en ensayos.', fr: 'J’ai commencé à gérer mes connaissances en texte brut et backlinks : journal, revues hebdomadaires, système de principes, et transformer l’expérience en essais.', de: 'Ich begann, Wissen in Klartext und Backlinks zu verwalten: Tagebuch, Wochenrückblicke, ein Prinzipiensystem – und Erfahrung in Essays zu verwandeln.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Writing', 'PKM'],
  },
  {
    id: 'university-start',
    cv: true,
    type: 'education',
    start: '2022-09',
    end: '2026-06',
    org: { en: 'Hebei University of Engineering Technology', zh: '河北工程技术学院', ja: '河北工程技術学院', es: 'Universidad de Ingeniería de Hebei', fr: 'Université d’ingénierie du Hebei', de: 'Hebei-Universität für Ingenieurtechnik' },
    role: { en: 'B.Eng. Internet of Things Engineering', zh: '物联网工程 · 本科', ja: 'IoT工学・学士', es: 'Grado en Ingeniería IoT', fr: 'Licence en ingénierie IoT', de: 'B.Eng. IoT-Technik' },
    summary: { en: 'Studied both hardware and software; what stayed was an interest in systems and a way of learning that is my own.', zh: '从硬件到软件都学了一遍；真正留下来的，是对系统的兴趣和一套自己的学习方式。', ja: 'ハードウェアからソフトウェアまで一通り学び、残ったのはシステムへの関心と自分なりの学び方。', es: 'Estudié hardware y software; lo que quedó fue el interés por los sistemas y una forma propia de aprender.', fr: 'J’ai étudié le matériel et le logiciel ; ce qui reste, c’est l’intérêt pour les systèmes et ma propre façon d’apprendre.', de: 'Ich studierte Hardware und Software; geblieben sind das Interesse an Systemen und meine eigene Art zu lernen.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['IoT', 'Computer Science'],
  },
  {
    id: 'tennis-journey',
    type: 'life',
    start: '2022-09',
    end: null,
    org: { en: 'Tennis', zh: '网球', ja: 'テニス', es: 'Tenis', fr: 'Tennis', de: 'Tennis' },
    role: { en: 'Long-term player', zh: '长期练习者', ja: '長期的な練習者', es: 'Jugador de largo plazo', fr: 'Pratiquant de longue date', de: 'Langjähriger Spieler' },
    summary: { en: 'Started systematic training in freshman year — two to three sessions a week, and a belief in slow feedback.', zh: '从大一开始系统训练，最长的一次坚持：每周两到三次，相信慢反馈。', ja: '大学1年から体系的な練習を開始。週2〜3回、最も長く続いている習慣。', es: 'Empecé a entrenar en serio en primero: dos o tres sesiones por semana, y una fe en la retroalimentación lenta.', fr: 'J’ai commencé un entraînement systématique en première année : deux à trois séances par semaine, et la croyance aux retours lents.', de: 'Seit dem ersten Studienjahr systematisches Training – zwei bis drei Einheiten pro Woche und der Glaube an langsames Feedback.' },
    location: { en: 'Shijiazhuang, China', zh: '中国 · 石家庄', ja: '中国・石家荘', es: 'Shijiazhuang, China', fr: 'Shijiazhuang, Chine', de: 'Shijiazhuang, China' },
    tags: ['Tennis', 'Habit'],
  },
];

/**
 * Sortable month value for `YYYY-MM` strings (e.g. 2026-03 -> 202603).
 */
function monthValue(value: string): number {
  const [year, month] = value.split('-');
  return Number(year) * 100 + Number(month ?? 1);
}

/** Resolve a localized field, falling back to English. */
function pick(value: L, lang: Locale): string {
  return value[lang] ?? value.en;
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
