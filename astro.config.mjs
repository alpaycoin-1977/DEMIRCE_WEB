// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.demirce.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: false, // Speculation Rules API kullanılıyor (Base.astro)
  image: {
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/offline'),
      changefreq: 'monthly',
    }),
  ],
  vite: {
    build: { assetsInlineLimit: 2048, chunkSizeWarningLimit: 700 },
  },
});
