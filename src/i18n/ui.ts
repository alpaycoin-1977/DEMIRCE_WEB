export type Lang = 'tr' | 'en';
export const LANGS: Lang[] = ['tr', 'en'];

/** Sayfa anahtarları → dil bazlı yollar. Dil değiştirici ve hreflang bunu kullanır. */
export const ROUTES = {
  home: { tr: '/', en: '/en/' },
  projects: { tr: '/projeler/', en: '/en/projects/' },
  office: { tr: '/ofis/', en: '/en/studio/' },
  services: { tr: '/hizmetler/', en: '/en/services/' },
  feasibility: { tr: '/fizibilite/', en: '/en/feasibility/' },
  board: { tr: '/pano/', en: '/en/board/' },
  journal: { tr: '/gunluk/', en: '/en/journal/' },
  contact: { tr: '/iletisim/', en: '/en/contact/' },
  privacy: { tr: '/kvkk/', en: '/en/privacy/' },
} as const;
export type RouteKey = keyof typeof ROUTES;

export const projectUrl = (slug: string, lang: Lang) => `${ROUTES.projects[lang]}${slug}/`;
export const postUrl = (slug: string, lang: Lang) => `${ROUTES.journal[lang]}${slug}/`;

/** Türkçe/İngilizce arayüz metinleri */
export const ui = {
  tr: {
    'meta.tagline': 'Otel, Konut ve Karma Kullanım Projeleri · İzmir',
    'meta.description':
      "DEMİRCE, İzmir Alsancak'ta 1999'dan bu yana otel, büyük ölçekli konut ve karma kullanım projeleri tasarlayan mimarlık ofisi. Mimari proje, iç mimarlık ve peyzaj.",
    'nav.projects': 'Projeler',
    'nav.office': 'Ofis',
    'nav.services': 'Hizmetler',
    'nav.journal': 'Günlük',
    'nav.contact': 'İletişim',
    'nav.feasibility': 'Fizibilite',
    'nav.board': 'İlham Panosu',
    'nav.start': 'Proje Başlat',
    'nav.menu': 'Menü',
    'nav.close': 'Kapat',
    'nav.skip': 'İçeriğe geç',
    'nav.home': 'Ana sayfa',
    'nav.privacy': 'KVKK & Gizlilik',
    'search.open': 'Ara',
    'search.placeholder': 'Proje, sayfa veya komut ara…',
    'search.empty': 'Sonuç bulunamadı.',
    'search.projects': 'Projeler',
    'search.pages': 'Sayfalar',
    'search.actions': 'Komutlar',
    'search.hint': 'gezin · seç · kapat',
    'theme.label': 'Görünüm',
    'theme.light': 'Açık',
    'theme.dark': 'Koyu',
    'theme.blueprint': 'Pafta',
    'theme.toggle': 'Görünümü değiştir',
    'lang.switch': 'English',
    'lang.short': 'EN',
    'common.readMore': 'Devamını oku',
    'common.viewProject': 'Projeyi incele',
    'common.allProjects': 'Tüm projeler',
    'common.back': 'Geri',
    'common.next': 'Sonraki',
    'common.prev': 'Önceki',
    'common.year': 'Yıl',
    'common.location': 'Konum',
    'common.category': 'Kategori',
    'common.client': 'İşveren',
    'common.status': 'Durum',
    'common.award': 'Ödül',
    'common.scope': 'Kapsam',
    'common.share': 'Paylaş',
    'common.copied': 'Bağlantı kopyalandı',
    'common.minRead': 'dk okuma',
    'common.since': "1999'dan beri",
    'board.add': 'Panoya ekle',
    'board.remove': 'Panodan çıkar',
    'board.added': 'İlham panosuna eklendi',
    'board.removed': 'Panodan çıkarıldı',
    'footer.sheet': 'Pafta',
    'footer.project': 'Proje',
    'footer.scale': 'Ölçek',
    'footer.date': 'Tarih',
    'footer.coords': 'Koordinat',
    'footer.drawn': 'Çizen',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.newsletter': 'Ofis haberleri',
    'footer.follow': 'Takip edin',
    'footer.office': 'Ofis',
    'footer.top': 'Başa dön',
    'cat.all': 'Tümü',
    'cat.hotel': 'Otel',
    'cat.residence': 'Rezidans',
    'cat.mixed': 'Karma Kullanım',
    'cat.education': 'Eğitim',
    'cat.interior': 'İç Mimari',
    'cat.competition': 'Yarışma',
    'cat.industrial': 'Endüstri',
    'view.grid': 'Izgara',
    'view.list': 'Liste',
    'view.map': 'Harita',
    'offline.title': 'Çevrimdışısınız',
  },
  en: {
    'meta.tagline': 'Hotels, Residential & Mixed-Use Architecture · İzmir',
    'meta.description':
      'DEMİRCE is an architecture studio in Alsancak, İzmir, designing hotels, large-scale residential and mixed-use projects since 1999. Architecture, interior design and landscape.',
    'nav.projects': 'Projects',
    'nav.office': 'Studio',
    'nav.services': 'Services',
    'nav.journal': 'Journal',
    'nav.contact': 'Contact',
    'nav.feasibility': 'Feasibility',
    'nav.board': 'Mood Board',
    'nav.start': 'Start a Project',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.skip': 'Skip to content',
    'nav.home': 'Home',
    'nav.privacy': 'Privacy',
    'search.open': 'Search',
    'search.placeholder': 'Search projects, pages or commands…',
    'search.empty': 'No results.',
    'search.projects': 'Projects',
    'search.pages': 'Pages',
    'search.actions': 'Commands',
    'search.hint': 'navigate · select · close',
    'theme.label': 'Appearance',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.blueprint': 'Blueprint',
    'theme.toggle': 'Change appearance',
    'lang.switch': 'Türkçe',
    'lang.short': 'TR',
    'common.readMore': 'Read more',
    'common.viewProject': 'View project',
    'common.allProjects': 'All projects',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.prev': 'Previous',
    'common.year': 'Year',
    'common.location': 'Location',
    'common.category': 'Category',
    'common.client': 'Client',
    'common.status': 'Status',
    'common.award': 'Award',
    'common.scope': 'Scope',
    'common.share': 'Share',
    'common.copied': 'Link copied',
    'common.minRead': 'min read',
    'common.since': 'Since 1999',
    'board.add': 'Add to board',
    'board.remove': 'Remove from board',
    'board.added': 'Added to your mood board',
    'board.removed': 'Removed from board',
    'footer.sheet': 'Sheet',
    'footer.project': 'Project',
    'footer.scale': 'Scale',
    'footer.date': 'Date',
    'footer.coords': 'Coordinates',
    'footer.drawn': 'Drawn by',
    'footer.rights': 'All rights reserved.',
    'footer.newsletter': 'Studio news',
    'footer.follow': 'Follow',
    'footer.office': 'Studio',
    'footer.top': 'Back to top',
    'cat.all': 'All',
    'cat.hotel': 'Hotel',
    'cat.residence': 'Residential',
    'cat.mixed': 'Mixed-Use',
    'cat.education': 'Education',
    'cat.interior': 'Interior',
    'cat.competition': 'Competition',
    'cat.industrial': 'Industrial',
    'view.grid': 'Grid',
    'view.list': 'List',
    'view.map': 'Map',
    'offline.title': 'You are offline',
  },
} as const;

export type UIKey = keyof (typeof ui)['tr'];
export const t = (lang: Lang) => (key: UIKey) => ui[lang][key] ?? ui.tr[key];

export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');

/** Türkçe karakter duyarsız arama için normalleştirme */
export const fold = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
