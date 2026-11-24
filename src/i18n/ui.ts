export type Lang = 'tr' | 'en';
export const LANGS: Lang[] = ['tr', 'en'];

/**
 * Site kök dizinde (www.demirce.com) ya da bir alt adreste (GitHub Pages
 * önizlemesi: /DEMIRCE_WEB/) yayınlanabilir. Tüm iç bağlantılar u() ile kurulur.
 */
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
/** Kök göreli yolu yayın adresine göre önekler: u('/ofis/') → '/DEMIRCE_WEB/ofis/' */
export const u = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path);
/** Öneki kaldırır (canonical / hreflang için gerçek site adresi) */
export const logical = (path: string) => (BASE && path.startsWith(`${BASE}/`) ? path.slice(BASE.length) : path);
/** Önizleme derlemesi mi? (arama motorlarına kapalı) */
export const PREVIEW = import.meta.env.DEMIRCE_PREVIEW === true;

/**
 * Adresler iki dilde de eski WordPress yapısıyla uyumludur; eski bağlantılar
 * public/.htaccess ve public/_redirects ile bu adreslere yönlendirilir.
 */
export const projectUrl = (slug: string, lang: Lang) => u(lang === 'tr' ? `/projeler/${slug}/` : `/en/projects/${slug}/`);
export const postUrl = (slug: string, lang: Lang) => u(lang === 'tr' ? `/gunluk/${slug}/` : `/en/journal/${slug}/`);

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
