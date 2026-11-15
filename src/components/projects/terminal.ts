/**
 * Terminal scripts for the v3 Works surfaces.
 *
 * These are presentational "CLI screenshots" authored as text — commands and
 * outputs in the voice of each project's README. Numbers are the published
 * metrics from `src/content/projects/**`; keep them in sync when a project
 * changes. The two featured scripts match the home page's terminal windows,
 * so a project looks identical wherever it appears.
 *
 * Tone legend: accent = success/sage, muted = secondary, dim = chrome.
 */
import type { Locale } from '../../i18n/config';

export type TerminalTone = 'accent' | 'muted' | 'dim';

export interface TerminalLine {
  cmd?: string;
  out?: string;
  tone?: TerminalTone;
}

export interface TerminalData {
  title: string;
  caption?: string;
  meta?: string;
  variant: 'paper' | 'evergreen';
  lines: TerminalLine[];
}

const scripts: Record<string, TerminalData> = {
  'fuma-platform': {
    title: 'fuma — zsh — 120×32',
    caption: 'CLI · REST · MCP · SKILL',
    meta: 'cli',
    variant: 'paper',
    lines: [
      { cmd: 'fuma auth status' },
      { out: '✓ 3 accounts · session pool healthy', tone: 'accent' },
      { out: '' },
      { cmd: 'fuma customers search --region hebei --has-export' },
      { out: '#   name              stage       last', tone: 'dim' },
      { out: '01  hebei hengda      quoted      2h', tone: 'muted' },
      { out: '02  sjz huakai tech   contacted   1d', tone: 'muted' },
      { out: '03  baoding ruifeng   follow-up   3d', tone: 'muted' },
      { out: '' },
      { cmd: 'fuma mcp serve --port 8787' },
      { out: '✓ capability registry ready', tone: 'accent' },
      { out: '43 capabilities / 4 interfaces', tone: 'muted' },
      { out: '# local facts + write outbox · read-only cache', tone: 'dim' },
    ],
  },
  'feige-outbound-platform': {
    title: 'feige — zsh — 120×32',
    caption: 'REST · CLI · MCP · ASR',
    meta: 'cli',
    variant: 'evergreen',
    lines: [
      { cmd: 'feige calls --today --stage follow_up' },
      { out: '42 calls · 18 connected · 9 queued', tone: 'accent' },
      { out: '' },
      { cmd: 'feige transcribe --all --speaker' },
      { out: '✓ 42/42 done · speaker split · 0.8× realtime', tone: 'accent' },
      { out: '' },
      { cmd: 'feige pipeline resume' },
      { out: '✓ queue drained · 93/93 tests · 27/27 checks', tone: 'accent' },
      { out: '' },
      { cmd: 'feige export --format csv --since 2026-11-01' },
      { out: '✓ 61 call records → ~/feige/exports/2026-11.csv', tone: 'accent' },
      { out: '# local ASR · no audio leaves the machine', tone: 'dim' },
    ],
  },
  'boss-client': {
    title: 'boss — zsh — 120×32',
    caption: 'CLI · REST · OpenAPI 3.1 · MCP',
    meta: '127.0.0.1:8790',
    variant: 'paper',
    lines: [
      { cmd: 'boss status' },
      { out: '✓ loggedIn=true · session 9d · risk clear', tone: 'accent' },
      { out: '' },
      { cmd: 'boss search jobs --keyword 外贸 --city 101090100' },
      { out: '#   title              district    salary', tone: 'dim' },
      { out: '01  外贸业务员          桥西区      8–12k', tone: 'muted' },
      { out: '02  外贸跟单员          长安区      6–9k', tone: 'muted' },
      { out: '' },
      { cmd: 'boss mcp' },
      { out: '✓ proxy → REST :8790 · 16 operations', tone: 'accent' },
      { out: '# read-only · single owner · no profile races', tone: 'dim' },
    ],
  },
  'zhilian-client': {
    title: 'zhilian — zsh — 120×32',
    caption: 'CLI · REST · MCP · SKILL',
    meta: '127.0.0.1:8791',
    variant: 'evergreen',
    lines: [
      { cmd: 'zhilian status' },
      { out: '✓ logged_in · health ok · token 7d', tone: 'accent' },
      { out: '' },
      { cmd: 'zhilian search jobs --keyword 外贸 --city 565 --pages 2' },
      { out: '40 rows · 37 unique companies · cached', tone: 'muted' },
      { out: '' },
      { cmd: 'zhilian companies jobs --number CZL1316344860' },
      { out: '✓ 21/21 positions · truncated=false', tone: 'accent' },
      { out: '' },
      { cmd: 'zhilian mcp' },
      { out: '17 tools → REST :8791 · 35 unit tests', tone: 'muted' },
      { out: '# read-only · structured cache · no HTML stored', tone: 'dim' },
    ],
  },
  'tanji-client': {
    title: 'tanji — zsh — 120×32',
    caption: 'CLI · REST · MCP · SKILL',
    meta: '127.0.0.1:8787',
    variant: 'paper',
    lines: [
      { cmd: 'tanji status' },
      { out: '✓ logged in · quota normal · 2 accounts', tone: 'accent' },
      { out: '' },
      { cmd: 'tanji search advance --filter-file filters.json' },
      { out: '345 conditions / 12 categories · 8 hits', tone: 'muted' },
      { out: '' },
      { cmd: 'tanji companies detail --sections basic,detail' },
      { out: '✓ light mode · 1 upstream call saved', tone: 'accent' },
      { out: '' },
      { cmd: 'tanji unlock --id 9f3c --confirm' },
      { out: '✓ contacts revealed · priority channel', tone: 'accent' },
      { out: '# 59 tests · 13 MCP tools · cache hit ~2 ms', tone: 'dim' },
    ],
  },
};

/** Terminal script for a project slug; hardware projects have none. */
export function terminalFor(slug: string, _lang?: Locale): TerminalData | undefined {
  return scripts[slug];
}
