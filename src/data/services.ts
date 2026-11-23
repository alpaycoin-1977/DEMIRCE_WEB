import type { Lang } from '~/i18n/ui';
type L = Record<Lang, string>;

export interface Service {
  id: string;
  title: L;
  short: L;
  body: L;
  points: Record<Lang, string[]>;
  projects: string[];
}

/** Hizmetler — metinleri ofisin kendi ifadelerine göre düzenleyebilirsiniz. */
export const services: Service[] = [
  {
    id: 'mimari',
    title: { tr: 'Mimari Proje', en: 'Architecture' },
    short: { tr: 'Konseptten uygulama projesine, tek elden koordinasyon.', en: 'From concept to construction drawings, coordinated in one hand.' },
    body: {
      tr: 'Arazinin topoğrafyasını, güneşi, hâkim rüzgârı ve manzarayı ilk tasarım girdisi olarak okuyoruz. Konsept, avan, uygulama ve detay projelerinde tüm disiplinleri mimar olarak koordine ediyoruz.',
      en: 'We read topography, sun, prevailing wind and view as the first design inputs. Through concept, schematic, construction and detail design, we coordinate every discipline as the architect.',
    },
    points: {
      tr: ['Arsa analizi ve yerleşim', 'Konsept ve avan proje', 'Uygulama ve detay projeleri', 'Disiplinlerarası koordinasyon'],
      en: ['Site analysis and planning', 'Concept and schematic design', 'Construction and detail drawings', 'Multidisciplinary coordination'],
    },
    projects: ['fenix84-antalya', 'atlas-azur', 'borncity'],
  },
  {
    id: 'ic-mimari',
    title: { tr: 'İç Mimarlık', en: 'Interior Design' },
    short: { tr: 'Otel, rezidans ve yaşam alanları için atmosfer tasarımı.', en: 'Atmosphere design for hotels, residences and homes.' },
    body: {
      tr: 'Renk ve malzeme paletinden aydınlatmaya, özel tasarım mobilyadan ıslak hacimlere kadar mekânın her ölçeğini tek bir konsept altında çözüyoruz.',
      en: 'From colour and material palettes to lighting, bespoke furniture and wet areas, we resolve every scale of the interior under one concept.',
    },
    points: {
      tr: ['Renk & malzeme paletleri', 'Aydınlatma tasarımı', 'Özel tasarım mobilya', 'Otel odası ve ortak alanlar'],
      en: ['Colour & material palettes', 'Lighting design', 'Bespoke furniture', 'Guest rooms and public areas'],
    },
    projects: ['otel-lusso', 'ilayda-avantgarde', 'coordinat-bornova-ic-mekan'],
  },
  {
    id: 'peyzaj',
    title: { tr: 'Peyzaj Tasarımı', en: 'Landscape' },
    short: { tr: 'Avlular, sosyal donatılar ve iklime duyarlı açık alanlar.', en: 'Courtyards, amenities and climate-responsive open space.' },
    body: {
      tr: 'Konut projelerini yaşam projelerine dönüştüren avlular, havuz çevreleri, yeşil çatılar ve gölgeli yarı açık mekânlar tasarlıyoruz.',
      en: 'We design the courtyards, pool decks, green roofs and shaded semi-open spaces that turn housing into places to live.',
    },
    points: {
      tr: ['Avlu ve sosyal alanlar', 'Yeşil çatı', 'Su ve gölge ile mikroklima', 'Kampüs peyzajı'],
      en: ['Courtyards and amenities', 'Green roofs', 'Microclimate with water and shade', 'Campus landscapes'],
    },
    projects: ['la-bonita-cigli', 'coordinat-bornova', 'mezitli-egitim-kampusu'],
  },
  {
    id: 'kentsel',
    title: { tr: 'Kentsel Dönüşüm & Master Plan', en: 'Urban Regeneration & Master Planning' },
    short: { tr: 'Ada ölçeğinde dönüşüm ve kampüs yerleşimleri.', en: 'Block-scale regeneration and campus master plans.' },
    body: {
      tr: 'Yüksek yoğunluklu kentsel dönüşüm projelerinde kullanıcı konforunu, kampüs ölçeğinde ise yaya omurgalarını ve kentle kurulan ilişkiyi tasarımın merkezine koyuyoruz.',
      en: 'In dense regeneration projects we put residents’ comfort first; at campus scale, pedestrian spines and the relationship with the city.',
    },
    points: {
      tr: ['Ada bazında dönüşüm', 'Kampüs master planları', 'Yoğunluk ve emsal analizi', 'Etaplama'],
      en: ['Block-scale regeneration', 'Campus master plans', 'Density and FAR studies', 'Phasing'],
    },
    projects: ['fenix84-antalya', 'iztu-kampus-yarismasi'],
  },
  {
    id: 'fizibilite',
    title: { tr: 'Fizibilite & Program Geliştirme', en: 'Feasibility & Programming' },
    short: { tr: 'Arsanın potansiyelini okumak, doğru programı kurmak.', en: 'Reading a site’s potential and building the right brief.' },
    body: {
      tr: 'Yatırımın en başında doğru soruları soruyoruz: Bu arsada ne kadar, ne ve kimin için yapılmalı? Borncity’de olduğu gibi, programı yeniden ele almak çoğu zaman projenin değerini belirler.',
      en: 'We ask the right questions at the very start: how much, what and for whom should be built here? As at Borncity, rethinking the brief often defines a project’s value.',
    },
    points: {
      tr: ['İmar ve emsal okuması', 'Kütle alternatifleri', 'Fonksiyon programı', 'Yatırımcı sunumları'],
      en: ['Zoning and FAR review', 'Massing options', 'Functional programme', 'Investor presentations'],
    },
    projects: ['borncity', 'coordinat-bornova'],
  },
  {
    id: 'yarisma',
    title: { tr: 'Yarışmalar & Sunum', en: 'Competitions & Presentation' },
    short: { tr: 'Ödüllü yarışma projeleri, renkli plan ve sunum standartları.', en: 'Award-winning competition entries and presentation standards.' },
    body: {
      tr: 'Ulusal mimari proje yarışmalarında ödüller aldık. Renkli plan, diyagram ve görselleştirme ile projeyi herkesin okuyabileceği bir dile çeviriyoruz.',
      en: 'We have won prizes in national architecture competitions. With colour plans, diagrams and visualisation we translate projects into a language everyone can read.',
    },
    points: {
      tr: ['Mimari proje yarışmaları', 'Renkli plan sunumları', 'Diyagram ve anlatı', '3B görselleştirme yönetimi'],
      en: ['Architecture competitions', 'Colour plan presentations', 'Diagrams and narrative', '3D visualisation direction'],
    },
    projects: ['mezitli-egitim-kampusu', 'iztu-kampus-yarismasi', 'folkart-life-bornova'],
  },
];

/** Tasarım süreci adımları */
export const process: { title: L; text: L }[] = [
  {
    title: { tr: 'Dinlemek', en: 'Listen' },
    text: {
      tr: 'İşverenin hedeflerini, kullanıcıyı ve arsanın verilerini — güneş, rüzgâr, manzara, topoğrafya — birlikte okuruz.',
      en: 'We read the client’s goals, the users and the site data — sun, wind, view, topography — together.',
    },
  },
  {
    title: { tr: 'Soru sormak', en: 'Question' },
    text: { tr: 'Doğru soruları doğru zamanda sorarak programı ve kütle kararlarını netleştiririz.', en: 'By asking the right questions at the right time we sharpen the brief and massing.' },
  },
  {
    title: { tr: 'Tek konsept', en: 'One concept' },
    text: { tr: 'Mimari, iç mimari ve peyzaj; mekânı tanımlayan adımlar olarak tek bir konseptte birleşir.', en: 'Architecture, interiors and landscape merge into one concept as steps that define the space.' },
  },
  {
    title: { tr: 'Detaylandırmak', en: 'Detail' },
    text: { tr: 'Uygulama projeleri ve detaylarla tasarımı üretilebilir kılarız; tüm disiplinleri koordine ederiz.', en: 'Construction drawings and details make the design buildable; we coordinate every discipline.' },
  },
  {
    title: { tr: 'Yanında olmak', en: 'Stay close' },
    text: { tr: 'Şantiye sürecinde tasarımın niyetinin korunması için işverenin yanında oluruz.', en: 'During construction we stay by the client’s side so the design intent is kept.' },
  },
];
