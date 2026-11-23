/**
 * İlham panosu için görsel dizini (derleme anında üretilir): /board-data.json
 */
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { projects } from '~/data/projects';
import { projectImages, imageId } from '~/lib/images';
import { projectUrl } from '~/i18n/ui';

export const GET: APIRoute = async () => {
  const out: Record<string, { s: string; w: number; h: number; t: [string, string]; u: [string, string]; c: string }> = {};
  for (const p of projects) {
    const imgs = projectImages(p.slug);
    const diag = new Set(p.diagrams ?? []);
    for (let i = 0; i < imgs.length; i++) {
      if (diag.has(i)) continue;
      const img = await getImage({ src: imgs[i], width: Math.min(720, imgs[i].width), format: 'webp', quality: 72 });
      out[imageId(p.slug, i)] = {
        s: img.src,
        w: imgs[i].width,
        h: imgs[i].height,
        t: [p.title.tr, p.title.en],
        u: [projectUrl(p.slug, 'tr'), projectUrl(p.slug, 'en')],
        c: p.color,
      };
    }
  }
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
};
