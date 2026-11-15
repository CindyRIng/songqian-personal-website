/**
 * Terminal scripts for the two featured work cards on the home page.
 *
 * These are presentational "CLI screenshots" authored as text — commands and
 * outputs in the voice of the projects' own READMEs. Numbers are the published
 * metrics from `src/content/projects/**`; keep them in sync if a project
 * changes. Unknown slugs fall back to a generic listing line.
 *
 * Tone legend: accent = success/sage, muted = secondary, dim = chrome.
 */
export type TerminalTone = 'accent' | 'muted' | 'dim';
export interface TerminalLine {
  cmd?: string;
  out?: string;
  tone?: TerminalTone;
}

interface TerminalScript {
  window: string;
  meta: string;
  lines: TerminalLine[];
}

const scripts: Record<string, TerminalScript> = {
  'fuma-platform': {
    window: 'fuma — zsh — 120×32',
    meta: 'cli',
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
    window: 'feige — zsh — 120×32',
    meta: 'cli',
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
};

/** Build terminal lines for a project, from its metrics when unknown. */
export function terminalFor(
  slug: string,
  fallbackTitle: string,
  metrics: { label: string; value: string }[] = []
): { window: string; meta: string; lines: TerminalLine[] } {
  const known = scripts[slug];
  if (known) return known;

  return {
    window: `${slug} — zsh — 120×32`,
    meta: 'cli',
    lines: [
      { cmd: `${slug} status` },
      {
        out: metrics.map((metric) => `${metric.value} ${metric.label}`).join(' · ') || 'ready',
        tone: 'accent',
      },
      { out: `# ${fallbackTitle}`, tone: 'dim' },
    ],
  };
}
