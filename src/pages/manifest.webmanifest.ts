import type { APIRoute } from 'astro';
import { SITE } from '~/data/site';
import { u } from '~/i18n/ui';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE.name,
      short_name: SITE.shortName,
      description: 'Mimarlık, iç mimarlık ve peyzaj — İzmir, 1999’dan beri',
      lang: 'tr',
      start_url: u('/'),
      scope: u('/'),
      display: 'standalone',
      background_color: '#efeeea',
      theme_color: '#0d0d0d',
      icons: [
        { src: u('/icons/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: u('/icons/icon-512.png'), sizes: '512x512', type: 'image/png' },
        { src: u('/icons/maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: u('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
