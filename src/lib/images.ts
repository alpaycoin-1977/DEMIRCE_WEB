import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/*/*.{webp,jpg,jpeg,png,avif}', { eager: true });

const bySlug = new Map<string, ImageMetadata[]>();
for (const [path, mod] of Object.entries(all).sort(([a], [b]) => a.localeCompare(b))) {
  const slug = path.split('/').at(-2)!;
  if (!bySlug.has(slug)) bySlug.set(slug, []);
  bySlug.get(slug)!.push(mod.default);
}

/** Projenin tüm görselleri (00 = kapak) */
export const projectImages = (slug: string): ImageMetadata[] => bySlug.get(slug) ?? [];
export const projectCover = (slug: string): ImageMetadata => {
  const imgs = projectImages(slug);
  if (!imgs.length) throw new Error(`Görsel bulunamadı: src/assets/projects/${slug}/`);
  return imgs[0];
};
/** Pano (moodboard) için kalıcı görsel kimliği */
export const imageId = (slug: string, index: number) => `${slug}/${String(index).padStart(2, '0')}`;
