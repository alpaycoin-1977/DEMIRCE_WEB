// @ts-check
/**
 * ALTERNATİF — "Monografi"
 * Aynı veri, görsel ve yazıları kullanan ikinci tasarım yaklaşımı.
 *   npm run dev:alt      → geliştirme
 *   npm run build:alt    → dist-alt/ klasörüne derler
 */
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.demirce.com',
  srcDir: './alt',
  outDir: './dist-alt',
  publicDir: './public',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: false,
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  vite: { build: { assetsInlineLimit: 2048 } },
});
