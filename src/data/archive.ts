/**
 * ARŞİV / PROJE ENDEKSİ
 * Eski blog yazılarında adı geçen ve henüz ayrıntılı proje sayfası olmayan işler.
 * Bilgiler eski web sitesindeki yazılardan derlenmiştir — yayına almadan önce kontrol edin.
 */
import type { Lang } from '~/i18n/ui';
import type { Category } from './projects';

export interface ArchiveItem {
  name: Record<Lang, string>;
  place?: Record<Lang, string>;
  year: number;
  category?: Category;
  note?: Record<Lang, string>;
  /** Günlük yazısı slug'ı (varsa) */
  post?: string;
}

export const archive: ArchiveItem[] = [
  {
    name: { tr: 'Palmarius Spa & Wellness', en: 'Palmarius Spa & Wellness' },
    year: 2024,
    category: 'interior',
    note: { tr: 'Spa ve sağlıklı yaşam merkezi iç mimarisi', en: 'Spa and wellness centre interiors' },
    post: 'spa-wellness',
  },
  {
    name: { tr: 'Flex Life Studio', en: 'Flex Life Studio' },
    place: { tr: 'Ulukent, Çiğli · İzmir', en: 'Ulukent, Çiğli · İzmir' },
    year: 2016,
    category: 'residence',
    note: { tr: '3.500 m² arsa üzerinde 157 konut; BYY İnşaat', en: '157 homes on a 3,500 m² site; BYY İnşaat' },
    post: 'flex-life-studio',
  },
  {
    name: { tr: 'Güzelbahçe Reliance Red', en: 'Güzelbahçe Reliance Red' },
    place: { tr: 'Güzelbahçe · İzmir', en: 'Güzelbahçe · İzmir' },
    year: 2016,
    category: 'residence',
    post: 'guzelbahce-reliance-red',
  },
  {
    name: { tr: 'A Yangın (AYG) Üretim ve Yönetim Binası', en: 'A Yangın (AYG) Production & Management Building' },
    place: { tr: 'Ayrancılar, Torbalı · İzmir', en: 'Ayrancılar, Torbalı · İzmir' },
    year: 2014,
    category: 'industrial',
    note: { tr: 'Çift cidarlı idari bina cephesi, planlama ve iç mimari', en: 'Double-skin administrative façade, planning and interiors' },
    post: 'ayg-fabrika',
  },
  {
    name: { tr: 'Evzen', en: 'Evzen' },
    year: 2014,
    note: { tr: "Mimarizm'de ayın projesi olarak yayımlandı", en: 'Featured as project of the month on Mimarizm' },
    post: 'mimarizm-evzen',
  },
  {
    name: { tr: 'Ekin Koleji Ataşehir Eğitim Kampüsü', en: 'Ekin College Ataşehir Campus' },
    place: { tr: 'İzmir', en: 'İzmir' },
    year: 2014,
    category: 'education',
  },
  {
    name: { tr: 'İZKA — İzmir Kalkınma Ajansı Mimari Proje Yarışması', en: 'İZKA — İzmir Development Agency Competition' },
    place: { tr: 'İzmir', en: 'İzmir' },
    year: 2013,
    category: 'competition',
  },
  {
    name: { tr: 'Parlas Rezidans', en: 'Parlas Residence' },
    place: { tr: 'Bornova · İzmir', en: 'Bornova · İzmir' },
    year: 2013,
    category: 'residence',
    note: { tr: '1+1 daireler ve galeri boşluklu dubleksler', en: 'One-bedroom flats and double-height duplexes' },
    post: 'parlas-rezidans',
  },
  {
    name: { tr: 'AtlasVadi İstanbul', en: 'AtlasVadi Istanbul' },
    place: { tr: 'İstanbul', en: 'Istanbul' },
    year: 2013,
    category: 'residence',
  },
  {
    name: { tr: 'Balçova Modern', en: 'Balçova Modern' },
    place: { tr: 'Balçova · İzmir', en: 'Balçova · İzmir' },
    year: 2013,
    note: { tr: 'Mimar Talip Şengül ile', en: 'With architect Talip Şengül' },
  },
  {
    name: { tr: 'Ekin Koleji Seyrek Yerleşkesi', en: 'Ekin College Seyrek Campus' },
    place: { tr: 'Seyrek · İzmir', en: 'Seyrek · İzmir' },
    year: 2013,
    category: 'education',
  },
  {
    name: { tr: 'Ekin Koleji Mavişehir Yerleşkesi', en: 'Ekin College Mavişehir Campus' },
    place: { tr: 'Mavişehir · İzmir', en: 'Mavişehir · İzmir' },
    year: 2013,
    category: 'education',
  },
  {
    name: { tr: 'Statü', en: 'Statü' },
    year: 2013,
  },
];
