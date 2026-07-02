// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pyrisconsulting.com',
  base: '/blog',
  // Phase 5 cutover DONE — site: flipped to apex; base:'/blog' stays (post-build script depends on it).
  // 'static' is the Astro 6 default: all pages prerendered; Keystatic's
  // auto-injected admin routes opt out with `prerender = false` internally.
  adapter: vercel(),
  integrations: [react(), keystatic(), sitemap()],
});
