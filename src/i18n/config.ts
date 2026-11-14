/**
 * Central i18n configuration.
 * To change the site's primary language, change `defaultLocale` here AND in
 * `astro.config.mjs` (`i18n.defaultLocale`).
 *
 * Route strategy:
 *   default locale -> `/`, `/about`, `/writing/...`
 *   other locales  -> `/zh`, `/zh/about`, `/ja/writing/...`
 */

export const locales = ['en', 'zh', 'ja', 'es', 'fr', 'de'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** BCP-47 tags used for <html lang>, hreflang and Intl APIs. */
export const localeMeta: Record<
  Locale,
  { htmlLang: string; label: string; nativeLabel: string; dir: 'ltr' | 'rtl'; ogLocale: string }
> = {
  en: { htmlLang: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr', ogLocale: 'en_US' },
  zh: { htmlLang: 'zh-CN', label: 'Chinese', nativeLabel: '简体中文', dir: 'ltr', ogLocale: 'zh_CN' },
  ja: { htmlLang: 'ja', label: 'Japanese', nativeLabel: '日本語', dir: 'ltr', ogLocale: 'ja_JP' },
  es: { htmlLang: 'es', label: 'Spanish', nativeLabel: 'Español', dir: 'ltr', ogLocale: 'es_ES' },
  fr: { htmlLang: 'fr', label: 'French', nativeLabel: 'Français', dir: 'ltr', ogLocale: 'fr_FR' },
  de: { htmlLang: 'de', label: 'German', nativeLabel: 'Deutsch', dir: 'ltr', ogLocale: 'de_DE' },
};

export const secondaryLocales = locales.filter((l) => l !== defaultLocale);

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const SITE = {
  /** Set after the domain is registered. */
  url: 'https://songqian-personal-website.pages.dev',
  name: 'Song Qian',
  handle: 'songqian',
  email: 'hello@songqian.dev',
  twitter: 'https://twitter.com/songqian',
  github: 'https://github.com/CindyRIng',
  linkedin: 'https://www.linkedin.com/in/songqian',
  /** Used by the footer's "handcrafted for N years" counter. */
  siteLaunch: '2026-01-01',
} as const;
