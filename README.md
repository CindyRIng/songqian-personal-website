# 宋谦 / Song Qian — Personal Website

The personal site of **宋谦 (Song Qian)** — account manager at [Fumamx](https://www.fumamx.com) in Shijiazhuang, 2026 graduate in IoT engineering, and someone who writes tools, keeps a diary, reads software architecture and calculus, and plays tennis.

Not a portfolio template: a content-first site built from an Obsidian vault of **392 days of journaling, 561 notes and 43 project logs**. Chinese is the primary language; the ten essays are also available in English under `/en/`.

**Live:** https://songqian.me · **Repo:** https://github.com/CindyRIng/songqian-personal-website

## Preview

| Home (light) | Home (dark) | Notes |
| --- | --- | --- |
| ![Home, light](docs/screenshots/home-light.jpg) | ![Home, dark](docs/screenshots/home-dark.jpg) | ![Notes](docs/screenshots/notes-light.jpg) |

| Reading | About | Works |
| --- | --- | --- |
| ![Reading](docs/screenshots/reading-light.jpg) | ![About](docs/screenshots/about-light.jpg) | ![Works](docs/screenshots/works-light.jpg) |

| Timeline | Writing | 404 |
| --- | --- | --- |
| ![Timeline](docs/screenshots/timeline-light.jpg) | ![Writing](docs/screenshots/writing-light.jpg) | ![404](docs/screenshots/notfound-light.jpg) |

| Mobile | Mobile menu |
| --- | --- |
| ![Home mobile](docs/screenshots/home-390.jpg) | ![Mobile menu](docs/screenshots/menu-390.jpg) |

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build) — static output, `<ClientRouter />` client-side navigation, ~24 KB of JS and ~148 KB of CSS (uncompressed) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + a small semantic token system in `src/styles/global.css` |
| Type | Source Serif 4, Inter, JetBrains Mono — self-hosted variable fonts (Fontsource) |
| i18n | Astro native i18n routing; Chinese at `/`, English at `/en/`; typed dictionary + `src/data/copy.ts` |
| Content | Astro Content Collections (MDX) for essays and projects; typed data modules for notes, reading and `now` |
| Hosting | Cloudflare Pages (custom domain, www → apex 301, legacy host redirect) |

## Routes

| Route | What it is |
| --- | --- |
| `/` | Content-first home: short intro, real record counts, four recent notes, a dated `Now` strip, selected tools, four recent essays, three books on the desk, a five-node timeline |
| `/writing` + `/writing/<slug>` | Ten essays zh/en as a numbered table of contents; article pages with TOC scroll-spy, code copy, image lightbox, heading anchors and reading progress |
| `/notes` | 28 short, mostly unedited entries from the diary and notes, grouped by month (Chinese only) |
| `/reading` | 17 books: reading, finished, abandoned — with hours, page progress and one honest line each (Chinese only) |
| `/now` | A dated snapshot of what I'm building, reading, training, writing, worrying about (Chinese + English summary) |
| `/works` + `/works/<slug>` | Six self-built tools with CLI terminal cards, honest metrics and case-study bodies |
| `/about` | A letter: three threads, a week in Shijiazhuang, six principles, four failures, the record counts, a short CV, FAQ |
| `/timeline` | Twenty-two entries from 2022 to now, including cancelled projects |
| `/en/…` | English versions of home, about, timeline, works, writing and articles |
| `/rss.xml`, `/en/rss.xml` | One localized feed per language (10 items each) |

`/projects/*` permanently redirects to `/works/*`.

## Content

- **Essays (10, zh + en):** 把大学活成一场复利 · 线性劳动与复利杠杆 · 我的知识管理方法论 · 从互联网史看 AI · 用神经网络的视角理解网球训练 · 我当下的困境 · 为什么我还在写日记 · 走一步看十步 · 在孚盟打电话 · 网球进阶：把比赛拆成可复盘的东西。
- **Projects (6, zh + en):** `fuma-platform` · `feige-outbound-platform` · `tennis-ball-robot` · `boss-client` · `zhilian-client` · `tanji-client`.
- **Notes (28):** dated entries from 2025-05 to 2026-11.
- **Books (17):** systems engineering, calculus, DDD/architecture, Linux, Python, economics, Covey.
- **Timeline (22):** study, club, internships, thesis, first job, tools, cancelled projects.

### Where the content comes from

Everything human on this site is curated from my own Obsidian vault (diary, notes, project logs, book projects) and edited for the web. Customer names, colleagues, amounts, contracts, relationship details and unpublished business plans are filtered out before publishing; what remains is my own methods, reading, work history and failures. Notes and reading pages are Chinese-first by design — they read like my notebook, not like translated marketing.

## Structure

```
src/
├── components/
│   ├── chrome/      # Masthead, SiteFooter, theme toggle
│   ├── home/        # hero, notes, now, works, writing, reading, timeline strip
│   ├── ui/          # SectionHead, StatBar, TerminalCard, ArrowLink, Icon
│   ├── about/       # portrait plate
│   ├── projects/    # featured cards, rows, layer diagram
│   ├── timeline/    # timeline entries + type colours
│   └── writing/     # essay rows, TOC, reading enhancements
├── content/
│   ├── posts/{zh,en}/<slug>.mdx
│   └── projects/{zh,en}/<slug>.mdx
├── data/
│   ├── copy.ts      # ← page-level strings, zh + en
│   ├── profile.ts   # ← identity, bio, contact, colophon
│   ├── timeline.ts  # ← 22 localized entries (cv: true → About CV)
│   ├── notes.ts     # ← dated notes + latestNotes()
│   ├── reading.ts   # ← books + currentlyReading
│   ├── now.ts       # ← the /now snapshot
│   └── about.ts     # ← about-page sections
├── i18n/            # locales (zh default, en), typed dictionary, helpers
├── layouts/BaseLayout.astro
├── lib/             # posts / projects helpers
├── pages/           # zh at root, en under /en/
└── styles/          # global tokens + custom Shiki themes
```

## Editing

1. **Voice / page copy** — `src/data/copy.ts` (`zh` + `en`).
2. **Identity, bio, contact** — `src/data/profile.ts`. Set `contact.phone` to reveal the phone row; drop a QR at `public/images/wechat-qr.png` for WeChat. Optional portrait: `public/images/portrait.{webp,jpg,png}`; life photos: `life-*.{webp,jpg}`; handwriting: `notes-*.{jpg,png}` (sections hide when absent).
3. **Notes** — append to `src/data/notes.ts` (`date`, `text`, optional `tags`/`source`); bump `notesUpdated`.
4. **Reading** — edit `src/data/reading.ts` (`status: read | reading | paused`, optional `hours`/`progress`).
5. **Now** — edit `src/data/now.ts`; `/now` renders it directly.
6. **Timeline** — `src/data/timeline.ts` (`cv: true` rows appear on About).
7. **Essays** — `src/content/posts/{zh,en}/<slug>.mdx`; covers in `public/images/posts/<slug>.webp` (og variants in `public/og/posts/`).
8. **Domain** — `site` in `astro.config.mjs`, `SITE.url` in `src/i18n/config.ts`, `public/robots.txt`.

## Commands

> Node **24** is required by Astro 7. The machine default is older — use the pinned shim:

```bash
source scripts/env.sh        # Node 24 on PATH for this shell
pnpm dev                     # http://localhost:4321
pnpm build                   # static build → dist/
pnpm preview                 # preview the production build
pnpm deploy                  # build + wrangler pages deploy
node scripts/indexnow.mjs https://songqian.me   # submit sitemap to IndexNow
```

## Design & interaction notes

- **Paper & ink system:** cream `#f7f2ed`, ink `#33302b`, sage `#52692f`, terracotta `#b4653a`, deep-evergreen dark theme. All colours are semantic tokens; body text passes WCAG AA.
- **Content-first home:** no hero manifesto, no decorative art plate; recent notes and `Now` come before the work sections.
- **Notebook pages:** `/notes`, `/reading` and `/now` use dates, thin rules, hanging labels and dense text instead of cards and numbering; Chinese-first with English summaries where it matters.
- **Interaction:** sticky paper-glass masthead, nav underline view transitions, theme wipe, full-screen mobile menu (stagger, focus trap, exact scroll restore), single-link cards, copy-to-clipboard email/phone, WeChat-QR lightbox, filter and FAQ animations, timeline year highlighting, article TOC/lightbox/keyboard flows. Every hover runs only on capable pointers; all motion respects `prefers-reduced-motion`; pages remain readable without JavaScript.
- **Client-side navigation:** only the content region cross-fades; intent prefetch + a short HTML cache keep page changes near-instant.

## SEO & GEO

- **Canonical domain** `songqian.me`, `hreflang` zh-CN / en / x-default (zh-only pages: zh-CN + x-default), per-page titles and descriptions, per-article 1200×630 social images, XML sitemap (47 URLs), two RSS feeds (10 items each), `rel=me` identity links.
- **Structured data:** `Person`, `WebSite`, `Blog`, `BlogPosting` + `BreadcrumbList`, `CollectionPage` + `ItemList`, `SoftwareApplication`/`CreativeWork`, `ProfilePage` + `FAQPage` — all validated JSON-LD.
- **GEO:** `/llms.txt` (entity facts, page map, recent notes, now, reading) and `/llms-full.txt` (full essay, case-study, note, now and reading text) generated from the data modules at build time; `robots.txt` welcomes major LLM crawlers; IndexNow submission to Bing/Yandex.
- **Legacy URLs:** `/projects/*` → `/works/*`; old `/zh /ja /es /fr /de` prefixes → the two-language routes. The old `pages.dev` host 301s to the domain via `functions/_middleware.ts`.

## Verification

- 49 pages build clean; 0 broken internal links; 0 console errors; one `<h1>` per page.
- CLS 0; no horizontal overflow at 320 / 390 / 768 / 1024 / 1440.
- Keyboard walkthroughs on all interactive flows; reduced-motion and no-JS passes on every page type.

## License

Content © Song Qian. Code MIT.
