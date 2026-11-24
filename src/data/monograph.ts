/**
 * Monografi sürümüne özel içerikler: ölçekler, dizin grupları, yerler.
 * Birikim, sayılarla değil ölçek, tipoloji ve coğrafya ile anlatılır.
 */
import type { Lang } from '~/i18n/ui';
import { projects, type Category } from '~/data/projects';
import { archive } from '~/data/archive';

type L = Record<Lang, string>;

/** Bir otel odasının detayından bir kent adasına */
export const scales: { ratio: string; name: L; slug: string; image: number; note: L }[] = [
  { ratio: '1:20', name: { tr: 'Detay', en: 'Detail' }, slug: 'otel-deco', image: 0, note: { tr: 'Kimi yerde askı, kimi yerde aydınlatma olan tek bir metal profil.', en: 'A single metal profile — a clothes rail here, a light there.' } },
  { ratio: '1:50', name: { tr: 'Oda', en: 'Room' }, slug: 'otel-lusso', image: 0, note: { tr: 'Planın ortasındaki küvet, manzaraya dönük.', en: 'A bathtub at the centre of the plan, facing the view.' } },
  { ratio: '1:200', name: { tr: 'Yapı', en: 'Building' }, slug: 'sd-apartmani', image: 0, note: { tr: 'Güneş kırıcı panellerle kurulan dolu-boş dengesi.', en: 'Solid and void balanced by brise-soleil panels.' } },
  { ratio: '1:500', name: { tr: 'Yapı grubu', en: 'Ensemble' }, slug: 'la-bonita-cigli', image: 0, note: { tr: 'Arazinin çeperine oturan kütle, ortada yaşayan bir avlu.', en: 'A perimeter block around a living courtyard.' } },
  { ratio: '1:2000', name: { tr: 'Kampüs', en: 'Campus' }, slug: 'iztu-kampus-yarismasi', image: 0, note: { tr: 'Topoğrafyayla bütünleşen yaya promenadları.', en: 'Pedestrian promenades woven into the topography.' } },
  { ratio: '1:5000', name: { tr: 'Kent adası', en: 'City block' }, slug: 'fenix84-antalya', image: 2, note: { tr: 'Ada ölçeğinde kentsel dönüşüm.', en: 'Urban regeneration at block scale.' } },
];

export const places: L[] = [
  { tr: 'İzmir', en: 'İzmir' },
  { tr: 'İstanbul', en: 'Istanbul' },
  { tr: 'Antalya', en: 'Antalya' },
  { tr: 'Kuşadası', en: 'Kuşadası' },
  { tr: 'Denizli', en: 'Denizli' },
  { tr: 'Mersin', en: 'Mersin' },
  { tr: 'Atırav', en: 'Atyrau' },
];

const GROUPS: { key: Category | 'other'; name: L }[] = [
  { key: 'hotel', name: { tr: 'Konaklama', en: 'Hospitality' } },
  { key: 'residence', name: { tr: 'Konut', en: 'Housing' } },
  { key: 'mixed', name: { tr: 'Karma kullanım', en: 'Mixed use' } },
  { key: 'education', name: { tr: 'Eğitim', en: 'Education' } },
  { key: 'interior', name: { tr: 'İç mekân', en: 'Interiors' } },
  { key: 'industrial', name: { tr: 'Endüstri', en: 'Industry' } },
  { key: 'competition', name: { tr: 'Yarışmalar', en: 'Competitions' } },
  { key: 'other', name: { tr: 'Diğer', en: 'Other' } },
];

export interface IndexEntry {
  name: L;
  place?: L;
  year?: number;
  slug?: string;
  post?: string;
}

/** Tüm çalışmalar, birincil tipolojiye göre (her çalışma tek grupta) */
export function indexGroups() {
  const primary: Record<string, Category> = {
    borncity: 'mixed',
    'coordinat-bornova': 'mixed',
    'coordinat-bornova-ic-mekan': 'interior',
    'otel-lusso': 'hotel',
    'otel-deco': 'hotel',
    'ilayda-avantgarde': 'hotel',
    'fenix84-antalya': 'residence',
    'folkart-life-bornova': 'residence',
  };
  const entries: { group: string; e: IndexEntry }[] = [];
  for (const p of projects) {
    const g = primary[p.slug] ?? p.categories[0];
    const place = p.city ? { tr: [p.district?.tr, p.city.tr].filter(Boolean).join(', '), en: [p.district?.en, p.city.en].filter(Boolean).join(', ') } : undefined;
    entries.push({ group: g, e: { name: p.title, place, year: p.year, slug: p.slug } });
  }
  for (const a of archive) {
    entries.push({ group: a.category ?? 'other', e: { name: a.name, place: a.place, year: a.year, post: a.post } });
  }
  return GROUPS.map((g) => ({ name: g.name, items: entries.filter((x) => x.group === g.key).map((x) => x.e) })).filter((g) => g.items.length);
}
