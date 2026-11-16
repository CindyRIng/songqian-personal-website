/**
 * Timeline type colours — one source of truth for the dot shown beside the
 * type label on the Timeline page (filter chips + entry rows).
 *
 * `--terra` is a graphic token (not for text), so it is safe for dots.
 */
import type { TimelineType } from '../../data/timeline';

export const TIMELINE_TYPE_DOTS: Record<TimelineType, string> = {
  work: 'var(--accent)',
  education: 'var(--terra)',
  milestone: 'var(--accent-strong)',
  life: 'var(--subtle)',
};
