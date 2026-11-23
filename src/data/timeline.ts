/**
 * OFİS ZAMAN ÇİZELGESİ — eski web sitesindeki yazılardan derlenmiştir.
 */
import type { Lang } from '~/i18n/ui';

export interface Milestone {
  year: number;
  title: Record<Lang, string>;
  text?: Record<Lang, string>;
  kind?: 'award' | 'build' | 'event' | 'press' | 'studio';
  href?: { project?: string; post?: string };
}

export const timeline: Milestone[] = [
  {
    year: 1999,
    kind: 'studio',
    title: { tr: 'Yolculuk başlıyor', en: 'The journey begins' },
    text: {
      tr: 'DEMİRCE, kurucularının 1999’da başladığı mimari yolculuğun adı olur.',
      en: 'DEMİRCE becomes the name of the architectural journey its founders began in 1999.',
    },
  },
  {
    year: 2007,
    kind: 'award',
    title: { tr: 'CNBC Best Architecture Ödülü', en: 'CNBC Best Architecture Award' },
  },
  {
    year: 2013,
    kind: 'event',
    title: { tr: 'Koleksiyon / İzmir SMD Mimarları Ağırlıyor', en: 'Koleksiyon / İzmir SMD Hosts Architects' },
    text: {
      tr: 'Serginin 10. konuğu DEMİRCE oldu; 15 proje Mithatpaşa’da sergilendi.',
      en: 'DEMİRCE was the 10th guest of the series, with 15 projects on show in Mithatpaşa.',
    },
    href: { post: 'koleksiyon-ismd-sergisi' },
  },
  {
    year: 2013,
    kind: 'award',
    title: { tr: 'Mersin Mezitli Eğitim Kampüsü — Birincilik Ödülü', en: 'Mersin Mezitli Education Campus — First Prize' },
    text: { tr: 'M.E.B. Eğitim Kampüsleri Mimari Proje Yarışması', en: 'Ministry of National Education campus competition' },
    href: { project: 'mezitli-egitim-kampusu' },
  },
  {
    year: 2014,
    kind: 'press',
    title: { tr: 'İzmir Mimarlık Merkezi söyleşisi', en: 'Talk at the İzmir Architecture Centre' },
    text: {
      tr: 'Mimarlar Odası İzmir Şubesi’nin “Bir Mimar ve Uygulamaları” söyleşisinde Alpay Demirci konuk oldu.',
      en: 'Alpay Demirci was the guest of the Chamber of Architects’ “An Architect and Their Work” talk series.',
    },
    href: { post: 'bir-mimar-ve-uygulamalari' },
  },
  {
    year: 2016,
    kind: 'build',
    title: { tr: 'Flex Life Studio temel atma', en: 'Flex Life Studio groundbreaking' },
    text: { tr: 'Çiğli Ulukent’te 157 konutluk proje yükselmeye başladı.', en: 'The 157-home project in Çiğli Ulukent broke ground.' },
    href: { post: 'flex-life-studio' },
  },
  {
    year: 2017,
    kind: 'build',
    title: { tr: 'Fenix84 Antalya temel atma', en: 'Fenix84 Antalya groundbreaking' },
    text: {
      tr: 'Özel sektör eliyle ada bazında Türkiye’nin en büyük kentsel dönüşüm projesi.',
      en: "Turkey's largest block-scale urban regeneration project by the private sector.",
    },
    href: { project: 'fenix84-antalya' },
  },
  {
    year: 2018,
    kind: 'event',
    title: { tr: '23 Nisan: Çocukların evleri 3B baskıyla maket oldu', en: '23 April: children’s drawings become 3D-printed models' },
    href: { post: '23-nisan-cocuklar-icin-mimarlik' },
  },
  {
    year: 2018,
    kind: 'award',
    title: { tr: 'İZTÜ Kampüs Yarışması — Eşdeğer İkinci Ödül', en: 'İZTÜ Campus Competition — Joint Second Prize' },
    href: { project: 'iztu-kampus-yarismasi' },
  },
  {
    year: 2024,
    kind: 'studio',
    title: { tr: 'Spa & Wellness çalışmaları', en: 'Spa & wellness work' },
    href: { post: 'spa-wellness' },
  },
];
