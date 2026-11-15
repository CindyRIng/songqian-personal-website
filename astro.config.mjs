// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import shikiPaper from './src/styles/shiki/songqian-paper.json';
import shikiEvergreen from './src/styles/shiki/songqian-evergreen.json';

// NOTE: `site` is the current Cloudflare Pages domain; switch it once a
// custom domain is registered.
export default defineConfig({
  site: 'https://songqian-personal-website.pages.dev',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: {
      themes: { light: shikiPaper, dark: shikiEvergreen },
      defaultColor: false,
      wrap: false,
    },
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en-US',
        },
      },
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  // ClientRouter handles navigation; intent prefetch lives in BaseLayout.
  prefetch: false,
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: 'lightningcss' },
  },
});
