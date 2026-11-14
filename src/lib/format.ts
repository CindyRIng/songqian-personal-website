/**
 * Tiny formatting helpers shared by the chrome and the home page.
 *
 * Design rule: this file never contains user-visible copy. Localized strings
 * always come from `src/i18n/ui.ts`; this file only formats numbers and dates,
 * or derives deterministic decoration (initials, hashes) from content.
 */
import { localeMeta, type Locale } from '../i18n/config';

const MS_PER_DAY = 86_400_000;
const MS_PER_YEAR = 365.2425 * MS_PER_DAY;

/** Deterministic 32-bit FNV-1a hash — used for stable cover-art variation. */
export function hashString(input: string): number {
  let hash = 2_166_136_261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16_777_619);
  }
  return hash >>> 0;
}

/**
 * Monogram-ish initials for decorative cover art.
 *   "Lumen Labs"  -> "LL"
 *   "设计系统"      -> "设计"
 *   "Hello"       -> "He"
 */
export function initialsOf(input: string, max = 2): string {
  const trimmed = (input ?? '').trim();
  if (!trimmed) return '';
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(trimmed)) {
    return [...trimmed].slice(0, max).join('');
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .slice(0, max)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
  return trimmed.slice(0, max).toUpperCase();
}

/** Locale-aware number formatting, e.g. 1,225 / 1 225 / 1.225. */
export function formatNumber(value: number, lang: Locale, maxFractionDigits = 0): string {
  return new Intl.NumberFormat(localeMeta[lang].htmlLang, {
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export type SiteAgeUnit = 'years' | 'months' | 'days';

export interface SiteAge {
  unit: SiteAgeUnit;
  /** Decimal years, whole months or whole days depending on `unit`. */
  value: number;
}

/**
 * How long the site has been alive, for the footer's "handcrafted for …" line.
 *   >= 1 year  -> years with up to two decimals ("21.18")
 *   >= 1 month -> whole months
 *   otherwise  -> whole days (minimum 1)
 */
export function siteAge(launchISO: string, now: Date = new Date()): SiteAge {
  const launch = new Date(`${launchISO}T00:00:00Z`);
  const diff = Math.max(0, now.getTime() - launch.getTime());

  const years = diff / MS_PER_YEAR;
  if (years >= 1) return { unit: 'years', value: Math.round(years * 100) / 100 };

  const months = Math.floor(diff / (MS_PER_YEAR / 12));
  if (months >= 1) return { unit: 'months', value: months };

  return { unit: 'days', value: Math.max(1, Math.floor(diff / MS_PER_DAY)) };
}

/** "2024" from a Date or ISO string. */
export function yearOf(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : String(date.getUTCFullYear());
}
