import type { APIRoute } from 'astro';
import { SITE } from '~/data/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE.name,
      short_name: SITE.shortName,
      description: 'Otel, konut ve karma kullanım projeleri — İzmir',
      lang: 'tr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#f3f1ec',
      theme_color: '#151515',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
      shortcuts: [
        { name: 'Projeler', url: '/projeler/' },
        { name: 'Fizibilite', url: '/fizibilite/' },
        { name: 'İlham Panosu', url: '/pano/' },
        { name: 'İletişim', url: '/iletisim/' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
