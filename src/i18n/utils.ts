import { defaultLocale, isLocale, localeMeta, locales, type Locale } from './config';
import { ui, type TranslationKey } from './ui';

/** Reads the active locale from a URL path (/en/about -> en; /about -> zh). */
export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return isLocale(first) ? first : defaultLocale;
}

/** Splits a pathname into its locale (if prefixed) and the locale-free path. */
export function stripLocale(pathname: string): { lang: Locale; path: string } {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const lang = segments[0];
    const rest = '/' + segments.slice(1).join('/');
    return { lang, path: rest === '/' ? '/' : rest.replace(/\/$/, '') || '/' };
  }
  return { lang: defaultLocale, path: pathname };
}

/**
 * Builds a locale-aware href. The default locale lives at the root and the
 * English pages under `/en/`. Page routes end with a slash (directory build +
 * `trailingSlash: 'always'`); files (feeds, images) never do.
 */
export function localizePath(path: string, lang: Locale): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (clean.length > 1) clean = clean.replace(/\/+$/, '');

  const localized =
    lang === defaultLocale ? clean || '/' : clean === '/' ? `/${lang}` : `/${lang}${clean}`;

  const isFile =
    /\.[a-z0-9]+$/i.test(localized) || localized.includes('?') || localized.includes('#');
  if (localized === '/' || isFile || localized.endsWith('/')) return localized;
  return `${localized}/`;
}

/** All localized variants of the current path, for hreflang + language switcher. */
export function getAlternates(pathname: string): { lang: Locale; href: string }[] {
  const { path } = stripLocale(pathname);
  return locales.map((lang) => ({ lang, href: localizePath(path, lang) }));
}

export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

/** Translation helper bound to a locale. */
export function useTranslations(lang: Locale) {
  return (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const value = ui[lang][key] ?? ui[defaultLocale][key] ?? key;
    return interpolate(value, vars);
  };
}

/** Locale-aware date formatting, e.g. "2026年11月15日" / "November 15, 2026". */
export function formatDate(date: Date, lang: Locale, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(localeMeta[lang].htmlLang, {
    dateStyle: style === 'long' ? 'long' : 'medium',
    timeZone: 'UTC',
  }).format(date);
}

/** Rough reading time in minutes for plain text / markdown. */
export function readingTime(text: string, wordsPerMinute = 300): number {
  const latinWords = text.trim().split(/\s+/).filter(Boolean).length;
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) ?? []).length;
  const words = latinWords + cjkChars / 2;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** ISO-8601 date string for <time datetime="..."> */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Month formatting for timelines: 2026-03 -> "2026年3月" / "Mar 2026" */
export function formatMonth(value: string, lang: Locale): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat(localeMeta[lang].htmlLang, {
    year: 'numeric',
    month: lang === 'zh' ? 'numeric' : 'short',
    timeZone: 'UTC',
  }).format(date);
}

export function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export { locales, localeMeta };
export type { Locale };
