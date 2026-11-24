// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Varsayılan: www.demirce.com kök dizini.
 * Önizleme (GitHub Pages): SITE_URL, SITE_BASE ve PREVIEW=1 ortam değişkenleriyle
 * derlenir — bkz. .github/workflows/pages.yml
 */
const PREVIEW = process.env.PREVIEW === '1';

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.demirce.com',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: false, // Speculation Rules API kullanılıyor (src/layouts/Book.astro)
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  vite: {
    build: { assetsInlineLimit: 2048 },
    define: { 'import.meta.env.DEMIRCE_PREVIEW': JSON.stringify(PREVIEW) },
  },
});
