import type { Lang } from '~/i18n/ui';

/**
 * Türkçe sayfalarda CSS `text-transform: uppercase` "i" harfini "İ" yapar.
 * Yabancı marka adlarında (Fenix84 → FENIX84) bu istenmez; bu kelimeler
 * lang="en" ile işaretlenir. Yeni marka adı eklemek için listeyi genişletin.
 */
const BRANDS = /\b(Fenix84|Fenix|Coordinat|D-Life|Life|Borncity|Bonita|Studio|Reliance|Palmarius|AtlasVadi|Architecture|Interiors|Wellness|Folkart|Avantgarde|Norms|Vesaire|Montessori|Mimaroba)\b/g;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const brandSafe = (text: string, lang: Lang) => {
  const e = esc(text);
  return lang === 'tr' ? e.replace(BRANDS, '<span lang="en">$1</span>') : e;
};
