/**
 * DERİNLEMESİNE — beş çalışma, beş soru.
 * Her inceleme ofisin "doğru soruyu doğru zamanda sormak" yaklaşımından
 * yola çıkarak bir soruyla açılır.
 *
 * Görsel referansı: "slug:indeks" (ör. "fenix84-antalya:3") ya da yalnızca
 * indeks (incelemenin kendi projesi). İndeksler src/assets/projects/<slug>/
 * klasöründeki dosya sırasıdır (00 = kapak).
 */
import type { Lang } from '~/i18n/ui';

type L<T = string> = Record<Lang, T>;
export type Ref = number | string;

export interface Figure {
  refs: Ref[];
  layout: 'full' | 'wide' | 'pair' | 'grid' | 'strip' | 'inset';
  caption?: L;
}
export interface Chapter {
  title: L;
  body: L<string[]>;
  figures?: Figure[];
}
export interface Case {
  slug: string;
  question: L;
  lead: L;
  hero: Ref;
  chapters: Chapter[];
}

export const cases: Case[] = [
  {
    slug: 'mezitli-egitim-kampusu',
    question: { tr: 'Bir okul, bir kentin omurgası olabilir mi?', en: 'Can a school become the backbone of a city?' },
    lead: {
      tr: 'Mersin Mezitli’de bir eğitim kampüsü için açılan ulusal yarışmada birincilik ödülü alan proje, Antik Soli kentinin 200 sütunlu caddesinden aldığı fikirle kampüsü bir yaya omurgası üzerine kurar ve okulu kente açar.',
      en: 'Winner of the national competition for an education campus in Mezitli, Mersin, the scheme borrows from the 200-column street of ancient Soli: the campus is built along a pedestrian spine and opened up to the city.',
    },
    hero: 0,
    chapters: [
      {
        title: { tr: 'Güneşin kenti', en: 'City of the sun' },
        body: {
          tr: [
            'Mersin’in batısında kalan Soli-Pompeiopolis, Mezitli’nin en önemli ören yerlerinden biridir. Antik kentin en önemli yapısı, Roma döneminde yapılmış, kuzey-güney yönünde uzanan 200 sütunlu caddedir. Bu cadde geçmişte fikirlerin paylaşıldığı, sanat eserlerinin sergilendiği bir alan olarak kullanılmış; zamanla çarşı, sosyal etkinlik alanı ve galeri kimliği kazanmıştır.',
            'Güneşli gün sayısının çok olduğu ilçede her yıl bir Güneş Festivali düzenlenir. Kampüs bu iki veriden — tarihî bir caddeden ve güneşten — doğdu.',
          ],
          en: [
            'West of Mersin lies Soli-Pompeiopolis, one of the most important archaeological sites in Mezitli. Its defining structure is a Roman colonnaded street of 200 columns running north–south — once a place to share ideas and display art, later a market, a social space and a gallery.',
            'With so many sunny days a year, the district holds an annual Sun Festival. The campus grew out of these two facts: a historic street, and the sun.',
          ],
        },
        figures: [{ refs: [1], layout: 'full', caption: { tr: 'Arazi ve kampüs yerleşimi', en: 'Site and campus layout' } }],
      },
      {
        title: { tr: 'Önce eğitim, sonra mimari', en: 'Education first, then architecture' },
        body: {
          tr: [
            'Mimari bir kurgudan önce eğitimin bugün nasıl yapıldığını ve sorunların nerede ortaya çıktığını anlamak gerekiyordu. Ezbercilikten uzak, araştırmaya dönük; bilginin aktarıldığı değil, paylaşıldıkça çoğaldığı bir sistem.',
            'Öğrencinin bireysel ve grup çalışmalarında kurgunun içine dâhil edildiği, yaşayarak öğrenmeye dayanan, öğrenci odaklı ve demokratik bir eğitim; mekânın da buna esneklik ve özgürlükle eşlik etmesi.',
          ],
          en: [
            'Before any architecture, we had to understand how teaching happens today and where it fails: away from rote learning, towards research — a system in which knowledge is not handed down but shared, and grows as it is shared.',
            'Student-centred, democratic education based on learning by doing, with students part of the process individually and in groups — and a space that supports this with flexibility and freedom.',
          ],
        },
        figures: [{ refs: [2, 3], layout: 'pair' }],
      },
      {
        title: { tr: 'Omurga', en: 'The spine' },
        body: {
          tr: [
            'Proje alanından sonradan çıkarılan bölüm bir avantaja dönüştürüldü: öğrencinin ve kentlinin serbestçe dolaşabileceği, yoğun peyzajlı bir Kent Parkı. Buradan başlayan yaya omurgası, kuzeybatıdaki sosyal etkinlik meydanına kadar uzanır; bütün işlevler bu omurgaya takılır.',
            'Omurga arazinin coğrafyasından biçim alır. Eğitim blokları ile sosyal merkezin eklemlendiği yerlerde eğimden doğan küçük amfiler ve zemine kavuşan yeşil çatılar, alt ve üst kotları kesintisiz bağlar. Güneyde derslikler, kuzeyde eğimin içine gömülen yemekhane, kütüphane, kulüp odaları ve yönetim yer alır.',
          ],
          en: [
            'A portion later removed from the site became an asset: a densely planted City Park open to students and residents alike. From here a pedestrian spine runs to the social square in the north-west, and every function plugs into it.',
            'The spine takes its shape from the land. Where teaching blocks meet the social centre, small amphitheatres and green roofs that touch the ground tie the upper and lower levels together. Classrooms lie to the south; the dining hall, library, club rooms and administration are set into the slope to the north.',
          ],
        },
        figures: [
          { refs: [7, 8, 9, 10], layout: 'grid', caption: { tr: 'Yaya omurgasının oluşumu — dört adımda diyagram', en: 'Forming the pedestrian spine — a diagram in four steps' } },
          { refs: [4], layout: 'strip' },
        ],
      },
      {
        title: { tr: 'İklimle tasarlamak', en: 'Designing with the climate' },
        body: {
          tr: [
            'Akdeniz ikliminde eğitim yapıları zemin katta geri çekilerek revaklar oluşturuldu; sosyal donatıların saçakları öne çıkarılarak gölgeli yarı açık mekânlar yaratıldı. Bloklar omurga boyunca birbirinden koparılarak denize vistalar açıldı ve deniz rüzgârı kampüsün içine alındı.',
            'Yeşil çatılar, güneş kolektörleri ve güneş pilleri, yağmur suyu ve gri su geri kazanımı, gün ışığı ve aydınlatma otomasyonu öngörüldü. Sürdürülebilir sistemlerin ilk yatırımı %5–10 artırması, işletmede ise %50–70’e varan enerji tasarrufu sağlaması hedeflendi.',
          ],
          en: [
            'In a Mediterranean climate, teaching blocks are set back at ground level to form arcades, and the deep eaves of social buildings create shaded semi-open spaces. Blocks are separated along the spine to frame views of the sea and draw the sea breeze into the campus.',
            'Green roofs, solar thermal and photovoltaic panels, rain and greywater recycling, daylighting and lighting automation were proposed — expected to add 5–10% to construction cost while saving up to 50–70% of operating energy.',
          ],
        },
        figures: [{ refs: [5], layout: 'strip', caption: { tr: 'Güneş ve gölge — kesit', en: 'Sun and shade — section' } }],
      },
      {
        title: { tr: 'Büyüyebilen bir kampüs', en: 'A campus that can grow' },
        body: {
          tr: [
            'Gelecekteki büyümeye olanak tanıyan, 3’lü ve 4’lü modüllerden oluşan, üreyebilen bir kurgu tercih edildi. Her modül kendi boşluğu ve bahçesiyle bir yaşam alanı oluşturur; hepsi zeminde omurgaya, yani bir stoaya açılır.',
            'Kampüs girişindeki Kent Meydanı; spor merkezi, konferans salonu ve kütüphanesiyle okul saatleri dışında kentliye açılabilir ve Güneş Festivali gibi şenliklere ev sahipliği yapabilir. Okul, kentin bir parçası olur.',
          ],
          en: [
            'An expandable system of three- and four-unit modules was chosen. Each module forms its own living space around a void and garden, and all open onto the spine — a stoa — at ground level.',
            'The City Square at the entrance, with its sports centre, conference hall and library, can open to residents outside school hours and host events such as the Sun Festival. The school becomes part of the city.',
          ],
        },
        figures: [
          { refs: [12], layout: 'inset', caption: { tr: 'Kullanım diyagramı', en: 'Use diagram' } },
          { refs: [6], layout: 'strip' },
        ],
      },
    ],
  },
  {
    slug: 'fenix84-antalya',
    question: { tr: 'Yoğunluk ile konfor bir arada var olabilir mi?', en: 'Can density and comfort coexist?' },
    lead: {
      tr: 'Antalya’nın merkezinde, özel sektör eliyle gerçekleştirilen ada bazında Türkiye’nin en büyük kentsel dönüşüm projesi. Yüksek yapı yoğunluğu içinde ölçütümüz tek oldu: kullanıcının konforu.',
      en: 'In central Antalya, Turkey’s largest block-scale urban regeneration project carried out by the private sector. Within high density, we held to a single measure: the comfort of the people who live there.',
    },
    hero: 0,
    chapters: [
      {
        title: { tr: 'Bir adanın dönüşümü', en: 'Transforming a city block' },
        body: {
          tr: [
            'Fenix84, tarihi itibarıyla ada ölçeğindeki en büyük kentsel dönüşüm projesidir ve Antalya’nın merkezi bir lokasyonunda yer alır. Temeli 2017’de, Türkiye’de özel sektör tarafından gerçekleştirilen ada bazında en büyük kentsel dönüşüm projesi olma unvanıyla atıldı.',
          ],
          en: [
            'Fenix84 was, at the time, the largest urban regeneration project at the scale of a city block, located in central Antalya. Its foundation was laid in 2017 as Turkey’s largest block-scale regeneration project carried out by the private sector.',
          ],
        },
        figures: [{ refs: [2], layout: 'full', caption: { tr: 'Ada içinde ortak avlu', en: 'The shared courtyard within the block' } }],
      },
      {
        title: { tr: 'Yaşam kurma sanatı', en: 'The art of building a life' },
        body: {
          tr: [
            'Yapı yoğunluğunun yüksek olduğu bir projede kullanıcı konforunu ön planda tuttuk. Mimarlığın yaşam kurma sanatı olduğunun farkındalığıyla hareket ettik.',
            'Kütleler ada içinde ortak bir avlu tanımlar; konutlar ve ortak yaşam alanları bu avluya bakar.',
          ],
          en: [
            'In a scheme of high density, we kept residents’ comfort at the forefront, guided by the belief that architecture is the art of building a life.',
            'The volumes define a shared courtyard within the block, with homes and communal spaces looking onto it.',
          ],
        },
        figures: [{ refs: [5, 6], layout: 'pair' }],
      },
      {
        title: { tr: 'Kütleden detaya', en: 'From massing to detail' },
        body: {
          tr: ['Genel kütle kararlarından iç mekândaki bir detaya kadar, kullanıcılara özel bir yaşam tasarladık. Ahşap dikey elemanlar ve teraslar cepheye derinlik ve gölge kazandırır.'],
          en: ['From the overall massing to a single interior detail, we designed a life tailored to the residents. Vertical timber elements and terraces give the façade depth and shade.'],
        },
        figures: [
          { refs: [3, 4], layout: 'pair', caption: { tr: 'Cephe detayı ve akşam görünümü', en: 'Façade detail and evening view' } },
          { refs: [1], layout: 'full' },
        ],
      },
    ],
  },
  {
    slug: 'borncity',
    question: { tr: 'Rezidans gerçekte nedir?', en: 'What is a residence, really?' },
    lead: {
      tr: 'Konut beklenen bir arsada programı yeniden yazdık: L formlu tek bir kütlenin kısa kolu otel, uzun kolu rezidans. Otel konforunu konutla gerçekten birleştiren bir yapı.',
      en: 'On a site expected to host housing, we rewrote the brief: one L-shaped volume, its short arm a hotel, its long arm residences — a building that genuinely merges hotel comfort with home.',
    },
    hero: 0,
    chapters: [
      {
        title: { tr: 'Soru', en: 'The question' },
        body: {
          tr: [
            'Rezidans kavramı, genel hatlarıyla otel konforunun konutlarda sağlanması söylemi olarak özetlenebilir. Çoğu zaman bir pazarlama sözcüğü olarak kalan bu kavramın üzerine gittik ve programı yeniden ele aldık.',
            'Sonuç: konut işlevi beklenen alanda otel ve konutu bir arada çözen gerçek bir rezidans.',
          ],
          en: [
            'A “residence” can be summed up as the promise of hotel-level comfort in a home — too often just a marketing word. We took the idea seriously and rethought the brief.',
            'The result: on a site expected to host housing, a true residence that combines hotel and home.',
          ],
        },
      },
      {
        title: { tr: 'L kütle', en: 'The L-shaped volume' },
        body: {
          tr: ['Arazinin getirisiyle L formlu bir kütle kurgulandı: kısa kolu otel, uzun kolu rezidans. İki program aynı yapıda, ama kendi kimlikleriyle yer alır.'],
          en: ['The site suggested an L-shaped volume: the short arm a hotel, the long arm residences. Two programmes share one building, each with its own identity.'],
        },
        figures: [{ refs: [2], layout: 'full', caption: { tr: 'Kuşbakışı: L formlu kütle', en: 'Aerial view: the L-shaped volume' } }],
      },
      {
        title: { tr: 'Cephe', en: 'Façade' },
        body: {
          tr: ['Turuncu paneller, koyu doğramalar ve gri yüzeyler cepheye bir ritim verir; yapı uzaktan tek bir kimlik olarak okunur.'],
          en: ['Orange panels, dark frames and grey surfaces give the façade its rhythm; from a distance the building reads as a single identity.'],
        },
        figures: [{ refs: [5, 4, 11], layout: 'grid' }],
      },
      {
        title: { tr: 'İç mekân', en: 'Interiors' },
        body: {
          tr: ['Lobi, otel odası ve rezidans dairesi aynı sakin malzeme dilini paylaşır: ahşap, açık tonlar ve gün ışığı.'],
          en: ['Lobby, hotel room and residential flat share the same calm material language: timber, light tones and daylight.'],
        },
        figures: [
          { refs: [8], layout: 'wide' },
          { refs: [6, 9], layout: 'pair' },
        ],
      },
    ],
  },
  {
    slug: 'ilayda-avantgarde',
    question: { tr: 'Bir yapıya ikinci bir hayat nasıl verilir?', en: 'How do you give a building a second life?' },
    lead: {
      tr: 'Kuşadası kruvaziyer limanının karşısında, 1980’lerin başında Mimar Salih Zeki Pekin’in tasarladığı bir tatil oteli. Kent büyüyüp değişince yapıya yeni bir kimlik kazandırıldı.',
      en: 'A holiday hotel designed in the early 1980s by architect Salih Zeki Pekin, facing the Kuşadası cruise port. As the town grew and changed, the building was given a new identity.',
    },
    hero: 1,
    chapters: [
      {
        title: { tr: 'Kıyıda bir yapı', en: 'A building on the shore' },
        body: {
          tr: ['İlayda Avantgarde Otel, Kuşadası kruvaziyer limanının karşısında, kıyı şeridinde yer alır. Yapı 1980’li yılların başında bir tatil oteli olarak Mimar Salih Zeki Pekin tarafından tasarlanmıştır.'],
          en: ['İlayda Avantgarde Hotel stands on the shoreline opposite the Kuşadası cruise port. It was designed in the early 1980s as a holiday hotel by architect Salih Zeki Pekin.'],
        },
        figures: [{ refs: [6], layout: 'wide' }],
      },
      {
        title: { tr: 'Yeni bir kimlik', en: 'A new identity' },
        body: {
          tr: ['Zamanla Kuşadası’nın büyüyüp gelişmesi ve değişen koşullar nedeniyle yapıya yeni bir kimlik kazandırma kararı alındı. Mevcut yapıya saygı duyarak, iç mekânda denizle kurulan ilişkiyi yeniden tanımladık.'],
          en: ['As Kuşadası grew and conditions changed, the decision was taken to give the building a new identity. Respecting the existing structure, we redefined its relationship with the sea from the inside.'],
        },
      },
      {
        title: { tr: 'Taş, ahşap, ışık', en: 'Stone, timber, light' },
        body: {
          tr: ['Koyu doğal taş, sıcak ahşap ve kontrollü aydınlatma; merdivenden lobiye, koridordan odaya tek bir malzeme dili.'],
          en: ['Dark natural stone, warm timber and controlled light — one material language from staircase to lobby, corridor to room.'],
        },
        figures: [
          { refs: [4, 2], layout: 'pair' },
          { refs: [3], layout: 'full' },
        ],
      },
      {
        title: { tr: 'Oda', en: 'The room' },
        body: {
          tr: ['Odada taş duvar, ahşap ve gizli ışık bir araya gelir; manzara her zaman ön planda kalır.'],
          en: ['In the rooms, stone walls, timber and concealed light come together, with the view always in front.'],
        },
        figures: [
          { refs: [0, 5], layout: 'pair' },
          { refs: [7], layout: 'wide' },
        ],
      },
    ],
  },
  {
    slug: 'coordinat-bornova',
    question: { tr: 'Bir öğrenci için ev mi, otel mi?', en: 'For a student: home or hotel?' },
    lead: {
      tr: 'Bornova’da genç ve dinamik bir kullanıcı kitlesi için klasik yaklaşımları yeniden ele aldık: otel ile ev arasında yeni bir model. Mimariden iç mekâna, tek bir düşünce.',
      en: 'In Bornova we rethought conventional approaches for a young, dynamic community: a new model between hotel and home. One idea, from architecture to interiors.',
    },
    hero: 0,
    chapters: [
      {
        title: { tr: 'Ara model', en: 'An in-between model' },
        body: {
          tr: [
            'Coordinat Bornova’da genç ve dinamik kullanıcıların ihtiyaçlarını esas aldık. Onlara yalnızca bir konut değil, bir yaşam tasarladık.',
            'Öğrencilere özel, otel konseptli bir “ev”: otel ile ev arasında bir ara model. Kullanıcı istekleri tasarımın ana girdisi oldu.',
          ],
          en: [
            'At Coordinat Bornova we started from the needs of young, dynamic residents, designing not just housing but a way of living.',
            'A hotel-concept “home” for students — an in-between model of hotel and home, with residents’ wishes as the main design input.',
          ],
        },
        figures: [{ refs: [1], layout: 'wide' }],
      },
      {
        title: { tr: 'Avlu', en: 'The courtyard' },
        body: {
          tr: ['Yapının ortasında, çeşitli sosyal donatılarla beslenen bir peyzaj alanı oluşturuldu. Kullanıcıların en çok vakit geçireceği yer burası olsun istedik.'],
          en: ['At the heart of the building lies a landscaped courtyard fed by a range of social amenities — designed to be where residents spend most of their time.'],
        },
        figures: [{ refs: [3, 4], layout: 'pair' }],
      },
      {
        title: { tr: 'Ortak yaşam', en: 'Shared life' },
        body: {
          tr: ['Çalışma alanları, salonlar ve spor alanı; endüstriyel bir kabuk içinde renkle ve ahşapla yumuşatılan ortak mekânlar.'],
          en: ['Study areas, lounges and a gym — shared spaces within an industrial shell, softened by colour and timber.'],
        },
        figures: [{ refs: [5, 6, 7, 8], layout: 'grid' }],
      },
      {
        title: { tr: 'Oda ve renk', en: 'Room and colour' },
        body: {
          tr: ['İç mekânda sarı, kırmızı ve ahşap; ortak alanlardan odalara kadar tek bir renk ve malzeme dili. Küçük metrekarede, her öğenin bir işi var.'],
          en: ['Yellow, red and timber inside — one colour and material language from shared spaces to rooms. In a small footprint, every element has a job.'],
        },
        figures: [
          { refs: ['coordinat-bornova-ic-mekan:0'], layout: 'full' },
          { refs: ['coordinat-bornova-ic-mekan:10', 'coordinat-bornova-ic-mekan:11', 'coordinat-bornova-ic-mekan:1'], layout: 'grid' },
        ],
      },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
export const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
