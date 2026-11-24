/**
 * ÇALIŞMA ALANLARI — Ofis sayfasında sade bir liste olarak gösterilir.
 * Metinleri ofisin kendi ifadelerine göre düzenleyebilirsiniz.
 */
import type { Lang } from '~/i18n/ui';
type L = Record<Lang, string>;

export interface Service {
  title: L;
  body: L;
  /** Örnek olarak bağlanacak çalışmalar (proje slug'ları) */
  projects: string[];
}

export const services: Service[] = [
  {
    title: { tr: 'Mimari proje', en: 'Architecture' },
    body: {
      tr: 'Arazinin topoğrafyasını, güneşi, hâkim rüzgârı ve manzarayı ilk tasarım girdisi olarak okuruz. Konseptten uygulama ve detay projelerine kadar tüm disiplinleri mimar olarak koordine ederiz.',
      en: 'We read topography, sun, prevailing wind and view as the first design inputs, and coordinate every discipline as the architect — from concept to construction and detail drawings.',
    },
    projects: ['fenix84-antalya', 'atlas-azur'],
  },
  {
    title: { tr: 'İç mimarlık', en: 'Interiors' },
    body: {
      tr: 'Renk ve malzeme paletinden aydınlatmaya, özel tasarım mobilyadan ıslak hacimlere kadar mekânın her ölçeğini tek bir konsept altında çözeriz.',
      en: 'From colour and material palettes to lighting, bespoke furniture and wet areas, we resolve every scale of an interior under one concept.',
    },
    projects: ['otel-lusso', 'ilayda-avantgarde'],
  },
  {
    title: { tr: 'Peyzaj', en: 'Landscape' },
    body: {
      tr: 'Konut projelerini yaşam projelerine dönüştüren avluları, havuz çevrelerini, yeşil çatıları ve gölgeli yarı açık mekânları tasarlarız.',
      en: 'We design the courtyards, pool decks, green roofs and shaded semi-open spaces that turn housing into places to live.',
    },
    projects: ['la-bonita-cigli', 'coordinat-bornova'],
  },
  {
    title: { tr: 'Kentsel dönüşüm ve master plan', en: 'Urban regeneration and master planning' },
    body: {
      tr: 'Yüksek yoğunluklu dönüşüm projelerinde kullanıcı konforunu, kampüs ölçeğinde ise yaya akslarını ve kentle kurulan ilişkiyi tasarımın merkezine koyarız.',
      en: 'In dense regeneration projects we put residents’ comfort first; at campus scale, pedestrian spines and the relationship with the city.',
    },
    projects: ['fenix84-antalya', 'iztu-kampus-yarismasi'],
  },
  {
    title: { tr: 'Arsa okuması ve program', en: 'Site reading and briefing' },
    body: {
      tr: 'Yatırımın en başında doğru soruları sorarız: Bu arsada ne kadar, ne ve kimin için yapılmalı? İmar koşullarını, kütle seçeneklerini ve işlev programını birlikte ele alırız. Borncity’de olduğu gibi, programı yeniden kurmak çoğu zaman bir projenin değerini belirler.',
      en: 'At the very start of an investment we ask the right questions: how much, what and for whom should be built here? We look at zoning, massing options and the functional brief together. As at Borncity, rewriting the brief often defines a project’s value.',
    },
    projects: ['borncity'],
  },
  {
    title: { tr: 'Yarışmalar', en: 'Competitions' },
    body: {
      tr: 'Ulusal mimari proje yarışmalarını bir araştırma alanı olarak görürüz; Mezitli Eğitim Kampüsü birincilik, İZTÜ Kampüs Yerleşkesi eşdeğer ikincilik ödülü aldı.',
      en: 'We see national architecture competitions as a field of research; the Mezitli Education Campus won first prize and the İZTÜ Campus a joint second prize.',
    },
    projects: ['mezitli-egitim-kampusu', 'iztu-kampus-yarismasi'],
  },
];
