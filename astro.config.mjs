// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import shikiPaper from './src/styles/shiki/songqian-paper.json';
import shikiEvergreen from './src/styles/shiki/songqian-evergreen.json';

// NOTE: `site` will be updated to the final custom domain once registered.
export default defineConfig({
  // TODO: switch to the custom domain once registered (e.g. https://songqian.me).
  site: 'https://songqian-personal-website.pages.dev',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  markdown: {
    shikiConfig: {
      // Dual themes emitted as CSS variables (`--shiki-light` / `--shiki-dark`)
      // so code blocks follow the paper/evergreen token system, switched in
      // global.css instead of shipping two different `<pre>` styles.
      themes: { light: shikiPaper, dark: shikiEvergreen },
      defaultColor: false,
      wrap: false,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja', 'es', 'fr', 'de'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // 404 pages are intentionally excluded from the sitemap.
      filter: (page) => !/\/404\/?$/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          zh: 'zh-CN',
          ja: 'ja-JP',
          es: 'es-ES',
          fr: 'fr-FR',
          de: 'de-DE',
        },
      },
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
