/**
 * English RSS feed — /rss.xml
 *
 * One item per essay, newest first, with tags as <category> and the channel
 * language declared for readers. Valid RSS 2.0 via @astrojs/rss.
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/posts';
import { defaultLocale, localeMeta, SITE } from '../i18n/config';
import { localizePath, useTranslations } from '../i18n/utils';

export async function GET(context: APIContext) {
  const lang = defaultLocale;
  const t = useTranslations(lang);
  const site = context.site ?? new URL(SITE.url);
  const posts = await getAllPosts(lang);

  return rss({
    title: t('rss.title'),
    description: t('rss.description'),
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
