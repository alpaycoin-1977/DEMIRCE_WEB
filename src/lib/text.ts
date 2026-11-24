import type { Lang } from '~/i18n/ui';

/**
 * Türkçe sayfalarda CSS büyük harf dönüşümü "i" harfini "İ" yapar; yabancı
 * marka adlarında (Fenix84 → FENIX84) istenmez. Bu kelimeler lang="en" ile işaretlenir.
 */
const BRANDS = /\b(Fenix84|Fenix|Coordinat|D-Life|Life|Borncity|Bonita|Studio|Reliance|Palmarius|AtlasVadi|Architecture|Interiors|Wellness|Folkart|Avantgarde|Norms|Vesaire|Mimaroba|Houses|Lusso|Deco|Atlas|Azur|Pandora|Spa)\b/g;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const brandSafe = (text: string, lang: Lang) => {
  const e = esc(text);
  return lang === 'tr' ? e.replace(BRANDS, '<span lang="en">$1</span>') : e;
};

/** Koordinat tabelası: 38,4304° K · 27,1358° D  /  38.4304° N · 27.1358° E */
export const formatCoords = (lat: number, lon: number, lang: Lang) => {
  const f = (n: number) => (lang === 'tr' ? Math.abs(n).toFixed(4).replace('.', ',') : Math.abs(n).toFixed(4));
  const ns = lat >= 0 ? (lang === 'tr' ? 'K' : 'N') : lang === 'tr' ? 'G' : 'S';
  const ew = lon >= 0 ? (lang === 'tr' ? 'D' : 'E') : lang === 'tr' ? 'B' : 'W';
  return `${f(lat)}° ${ns} · ${f(lon)}° ${ew}`;
};
