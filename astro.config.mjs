import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Public URL of the website: used for canonical links, Open Graph URLs, the sitemap and robots.txt.
// Override at build time with: SITE_URL=https://www.example.com npm run build
const SITE_URL = process.env.SITE_URL ?? 'https://teamrachna.tech';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      serialize(item) {
        const isHome = new URL(item.url).pathname === '/';
        item.lastmod = new Date().toISOString();
        item.changefreq = isHome ? 'weekly' : 'yearly';
        item.priority = isHome ? 1.0 : 0.4;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
