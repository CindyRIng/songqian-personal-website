import { defaultLocale, isLocale, localeMeta, locales, type Locale } from './config';
import { ui, type TranslationKey } from './ui';

/** Reads the active locale from a URL path (/zh/about -> zh). */
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
 * Builds a locale-aware href.
 * localizePath('/about', 'en') -> '/about'
 * localizePath('/about', 'zh') -> '/zh/about'
 * localizePath('/', 'ja')      -> '/ja'
 */
export function localizePath(path: string, lang: Locale): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (clean.length > 1) clean = clean.replace(/\/+$/, '');

  const localized =
    lang === defaultLocale ? clean || '/' : clean === '/' ? `/${lang}` : `/${lang}${clean}`;

  // The site is built with `build.format: 'directory'` and
  // `trailingSlash: 'always'`, so page routes end with a slash (matching the
  // sitemap and avoiding Cloudflare's 308 redirects). Assets never do.
  const isFile = /\.[a-z0-9]+$/i.test(localized) || localized.includes('?') || localized.includes('#');
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
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

/**
 * Translation helper bound to a locale.
 *   const t = useTranslations(lang);
 *   t('nav.about') // "About" | "关于" | ...
 */
export function useTranslations(lang: Locale) {
  return (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const value = ui[lang][key] ?? ui[defaultLocale][key] ?? key;
    return interpolate(value, vars);
  };
}

/** Locale-aware date formatting, e.g. "November 15, 2026" / "2026年11月15日". */
export function formatDate(date: Date, lang: Locale, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(localeMeta[lang].htmlLang, {
    dateStyle: style === 'long' ? 'long' : 'medium',
    timeZone: 'UTC',
  }).format(date);
}

/** "2024 — 2026" / "2024 — Present" style ranges for timelines and projects. */
export function formatRange(
  start: string,
  end: string | null | undefined,
  lang: Locale
): string {
  const t = useTranslations(lang);
  const endLabel = end ? end : t('common.present');
  return `${start} — ${endLabel}`;
}

/** Rough reading time in minutes for plain text / markdown. */
export function readingTime(text: string, wordsPerMinute = 230): number {
  const latinWords = text.trim().split(/\s+/).filter(Boolean).length;
  const cjkChars = (text.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) ?? []).length;
  const words = latinWords + cjkChars / 2.2;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

/** ISO-8601 date string for <time datetime="..."> */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Month formatting for timelines: 2024-03 -> "Mar 2024" / "2024年3月" */
export function formatMonth(value: string, lang: Locale): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat(localeMeta[lang].htmlLang, {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);
}

/** All locales that have real translations for a given slug — used to filter the switcher. */
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
