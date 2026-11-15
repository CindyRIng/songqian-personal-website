#!/usr/bin/env node
/**
 * Submit the deployed sitemap to IndexNow (Bing, Yandex, Seznam, Naver…).
 *
 * Usage:
 *   node scripts/indexnow.mjs https://songqian.me
 *
 * The key file lives at public/<key>.txt and is served from the site root.
 * Only run this once the custom domain is live (IndexNow fetches the key file
 * over HTTPS to verify ownership).
 */
import fs from 'node:fs';
import path from 'node:path';

const host = (process.argv[2] ?? 'https://songqian.me').replace(/\/$/, '');
const publicDir = path.resolve('public');
const keyFile = fs.readdirSync(publicDir).find((file) => /^[a-f0-9]{32}\.txt$/.test(file));
if (!keyFile) throw new Error('IndexNow key file not found in public/');
const key = fs.readFileSync(path.join(publicDir, keyFile), 'utf8').trim();

const sitemap = fs.readFileSync(path.resolve('dist/sitemap-0.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.length === 0) throw new Error('No URLs found in sitemap');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(host).host,
    key,
    keyLocation: `${host}/${keyFile}`,
    urlList: urls,
  }),
});

console.log(`IndexNow: submitted ${urls.length} URLs → ${response.status} ${response.statusText}`);
