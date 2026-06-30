// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // 'static' is the Astro 6 default: all pages prerendered; Keystatic's
  // auto-injected admin routes opt out with `prerender = false` internally.
  adapter: vercel(),
  integrations: [react(), keystatic()],
});
