import type { ImageMetadata } from 'astro';
import { projectImages } from '~/lib/images';
import type { Ref } from './cases';

/** "slug:indeks" veya indeks → görsel */
export const resolveRef = (ref: Ref, slug: string): ImageMetadata => {
  if (typeof ref === 'number') return projectImages(slug)[ref];
  const [s, i] = ref.split(':');
  return projectImages(s)[Number(i)];
};
