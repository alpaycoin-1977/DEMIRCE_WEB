export type Lang = 'tr' | 'en';
export const LANGS: Lang[] = ['tr', 'en'];

/**
 * Adresler iki dilde de eski WordPress yapısıyla uyumludur; eski bağlantılar
 * public/.htaccess ve public/_redirects ile bu adreslere yönlendirilir.
 */
export const projectUrl = (slug: string, lang: Lang) => (lang === 'tr' ? `/projeler/${slug}/` : `/en/projects/${slug}/`);
export const postUrl = (slug: string, lang: Lang) => (lang === 'tr' ? `/gunluk/${slug}/` : `/en/journal/${slug}/`);

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
