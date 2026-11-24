import type { APIRoute } from 'astro';
import { u, PREVIEW } from '~/i18n/ui';

// Önizleme derlemesi arama motorlarına tamamen kapalıdır
export const GET: APIRoute = ({ site }) =>
  new Response(
    PREVIEW
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL(u('/sitemap-index.xml'), site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
