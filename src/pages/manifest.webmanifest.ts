import type { APIRoute } from 'astro';
import { SITE } from '~/data/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE.name,
      short_name: SITE.shortName,
      description: 'Mimarlık, iç mimarlık ve peyzaj — İzmir, 1999’dan beri',
      lang: 'tr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#f5f3ee',
      theme_color: '#1b1a18',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
