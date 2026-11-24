import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/** Arazi tuvalinde kullanılacak fotoğraf (tarayıcıda siyah-beyaza çevrilir) */
export const landPhoto = async (img: ImageMetadata) => (await getImage({ src: img, width: Math.min(1600, img.width), format: 'webp', quality: 72 })).src;
