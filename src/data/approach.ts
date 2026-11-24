/**
 * YAKLAŞIM — ofisin beş ilkesi. Altbilgide ve Ofis sayfasında kullanılır.
 * Başlıklar ofisin kendi ifadeleridir; kısa açıklamaları yayından önce gözden geçirin.
 */
import type { Lang } from '~/i18n/ui';
type L = Record<Lang, string>;

export const approach: { title: L; body: L }[] = [
  {
    title: { tr: 'Fonksiyonellik', en: 'Functionality' },
    body: {
      tr: 'Mekân önce çalışmalı: kullanım, akış, bakım. Biçim, bu soruların cevabından doğar.',
      en: 'A space has to work first: use, flow, upkeep. Form grows out of the answers.',
    },
  },
  {
    title: { tr: 'Yenilikçilik', en: 'Innovation' },
    body: {
      tr: 'Her arsa yeni bir soru sorar. Hazır bir cevapla değil, o yere ait bir fikirle başlarız.',
      en: 'Every site asks a new question. We start from an idea that belongs to the place, not a ready answer.',
    },
  },
  {
    title: { tr: 'Yalınlık', en: 'Simplicity' },
    body: {
      tr: 'Az sayıda doğru kararla çok şey söylemek: detayda da, kent ölçeğinde de.',
      en: 'Saying a lot with a few right decisions — in a detail and at the scale of the city.',
    },
  },
  {
    title: { tr: 'Yaşamla bütünleşmek', en: 'Fitting into life' },
    body: {
      tr: 'Tasarım, kullananların gündelik hayatına uyar; insanları tasarıma uydurmaz.',
      en: 'Design adapts to the everyday lives of the people who use it, not the other way round.',
    },
  },
  {
    title: { tr: 'Çevreye değer katmak', en: 'Adding value to the surroundings' },
    body: {
      tr: 'Topoğrafya, güneş, hâkim rüzgâr ve komşuluk ilk tasarım girdilerimizdir. Yapı, bulunduğu yeri iyileştirmelidir.',
      en: 'Topography, sun, prevailing wind and neighbours are our first design inputs. A building should improve its place.',
    },
  },
];
