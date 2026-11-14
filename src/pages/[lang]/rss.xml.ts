/**
 * Localized RSS feeds — /zh/rss.xml, /ja/rss.xml, /es/rss.xml, /fr/rss.xml,
 * /de/rss.xml. Titles and descriptions are localized; items fall back to the
 * English original for essays that have not been translated yet.
 */
import rss from '@astrojs/rss';
import type { APIContext, GetStaticPaths } from 'astro';
import { getAllPosts } from '../../lib/posts';
import { localeMeta, secondaryLocales, SITE, type Locale } from '../../i18n/config';
import { localizePath, useTranslations } from '../../i18n/utils';
import { lt, profile } from '../../data/profile';

export const getStaticPaths = (() =>
  secondaryLocales.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = useTranslations(lang);
  const site = context.site ?? new URL(SITE.url);
  const authorName = lt(profile.name, lang) || profile.latinName;
  const posts = await getAllPosts(lang);

  return rss({
    title: `${authorName} — ${t('writing.title')}`,
    description: t('writing.subtitle'),
    site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: new URL(localizePath(post.path, lang), site).href,
      categories: post.tags,
    })),
    customData: `<language>${localeMeta[lang].htmlLang}</language>`,
  });
}
