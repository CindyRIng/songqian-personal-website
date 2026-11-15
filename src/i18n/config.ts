/**
 * Central i18n configuration — the site ships in Chinese (default, at `/`)
 * and English (at `/en/…`). Adding a locale later means adding it here, in
 * `astro.config.mjs`, in `ui.ts`, and in the content folders.
 */

export const locales = ['zh', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

/** BCP-47 tags used for <html lang>, hreflang and Intl APIs. */
export const localeMeta: Record<
  Locale,
  {
    htmlLang: string;
    label: string;
    nativeLabel: string;
    shortLabel: string;
    dir: 'ltr' | 'rtl';
    ogLocale: string;
  }
> = {
  zh: {
    htmlLang: 'zh-CN',
    label: 'Chinese',
    nativeLabel: '中文',
    shortLabel: '中',
    dir: 'ltr',
    ogLocale: 'zh_CN',
  },
  en: {
    htmlLang: 'en',
    label: 'English',
    nativeLabel: 'English',
    shortLabel: 'EN',
    dir: 'ltr',
    ogLocale: 'en_US',
  },
};

export const secondaryLocales = locales.filter((l) => l !== defaultLocale);

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export const SITE = {
  /** Update once a custom domain is registered. */
  url: 'https://songqian.me',
  name: 'Song Qian',
  nameZh: '宋谦',
  handle: 'songqian',
  email: 'cindyring_dream@outlook.com',
  github: 'https://github.com/CindyRIng',
  /** Used by the footer's "handcrafted for N months" counter (first sketch). */
  siteLaunch: '2026-07-14',
} as const;
