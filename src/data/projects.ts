/**
 * PROJELER
 * ---------------------------------------------------------------
 * Yeni proje eklemek için:
 *  1. Görselleri  src/assets/projects/<slug>/00.webp, 01.webp … olarak ekleyin
 *     (00 = kapak görseli). Uzun kenar ~2000px, WebP önerilir.
 *  2. Aşağıdaki listeye yeni bir kayıt ekleyin (en yeni en üstte).
 *  Metin dizilerinde "## " ile başlayan satırlar ara başlık olarak gösterilir.
 */
import type { Lang } from '~/i18n/ui';

export type Category = 'hotel' | 'residence' | 'mixed' | 'education' | 'interior' | 'competition' | 'industrial';
type L10n<T = string> = Record<Lang, T>;

export interface Project {
  slug: string;
  /** Eski WordPress adresi (/portfolio/<oldSlug>/) — yönlendirmeler için */
  oldSlug: string;
  title: L10n;
  categories: Category[];
  city?: L10n;
  district?: L10n;
  country: 'TR' | 'KZ';
  coords?: [number, number];
  year?: number;
  client?: string;
  award?: L10n;
  status?: L10n;
  scope: L10n<string[]>;
  /** Projenin kimlik rengi — proje sayfasında vurgu rengi olarak kullanılır */
  color: string;
  featured?: boolean;
  summary: L10n;
  body: L10n<string[]>;
  /** Galeride "diyagram" olarak küçük gösterilecek görsel indeksleri */
  diagrams?: number[];
}

export const CATEGORY_ORDER: Category[] = ['hotel', 'residence', 'mixed', 'education', 'interior', 'competition', 'industrial'];

export const projects: Project[] = [
  {
    slug: 'iztu-kampus-yarismasi',
    oldSlug: 'izmir-tinaztepe-universitesi-kampus-yerleskesi-tasarim-yarismasi',
    title: { tr: 'İZTÜ Kampüs Yerleşkesi', en: 'İZTÜ University Campus' },
    categories: ['education', 'mixed', 'competition'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Buca', en: 'Buca' },
    country: 'TR',
    coords: [38.3705, 27.2005],
    year: 2018,
    award: { tr: 'Eşdeğer İkinci Ödül', en: 'Joint Second Prize' },
    status: { tr: 'Ulusal tasarım yarışması', en: 'National design competition' },
    scope: { tr: ['Kampüs master planı', 'Mimari proje', 'Peyzaj'], en: ['Campus master plan', 'Architecture', 'Landscape'] },
    color: '#c65f60',
    featured: true,
    summary: {
      tr: 'Topoğrafyayla bütünleşen, kurumuş dere yatağını yeniden canlandıran ve günün her saati yaşayan yaya promenadları üzerine kurulu bir kampüs.',
      en: 'A campus woven into its topography, reviving a dry stream bed and organised around pedestrian promenades that stay alive at every hour of the day.',
    },
    body: {
      tr: [
        'İzmir Tınaztepe Üniversitesi Kampüs Yerleşkesi Tasarım Yarışması — Eşdeğer İkinci Ödül. DEMİRCE Norms at Architecture & Ofis Vesaire ortak çalışması.',
        'Projenin ana kurgusu tasarlanırken ve yerleşim kararları verilirken üst ölçekte arazinin Buca ilçesi içindeki konumunu ve ulaşım imkânlarını iyileştirmek; alt ölçekte ise alanın mevcut potansiyelini kullanan ve güçlü bir şekilde ortaya koyan, karakteristik topoğrafyasıyla bütünleşen, ulaşım kararlarıyla bölgeyle ilişki kuran bir kampüs anlayışı hedeflendi. Bu bağlamda proje alanı bütüncül bir tasarım anlayışıyla ele alınmış, ulaşım ve topoğrafya verilerinin yorumlanmasıyla odak noktaları tasarlanmıştır.',
        'Alanda yer alan kurumuş dere yatağı tekrar canlandırılmış, mekânların çevresinde örgütlendiği ana yaya promenadı desteklenmiştir. Yaya promenadları projede ana odaklara ulaşım için bir araç olarak değil; günün her saati yaşayacak, eğitim ve sosyal yaşantıyı buluşturacak koridorlar olarak yer bulmuştur.',
      ],
      en: [
        'İzmir Tınaztepe University Campus Design Competition — Joint Second Prize. A collaboration between DEMİRCE Norms at Architecture & Ofis Vesaire.',
        "At the larger scale, the scheme set out to improve the site's position and connections within the Buca district; at the smaller scale, to build a campus that draws on the site's existing potential, merges with its characteristic topography and relates to the surrounding area through its movement strategy. The site was approached holistically, with focal points derived from reading its access and topographic data.",
        'The dry stream bed running through the site is brought back to life, reinforcing the main pedestrian promenade around which the spaces are organised. The promenades are not merely routes between destinations but corridors that stay alive throughout the day, bringing learning and social life together.',
      ],
    },
    diagrams: [8, 9, 10],
  },
  {
    slug: 'atlas-azur',
    oldSlug: 'atlas-azur',
    title: { tr: 'Atlas Azur', en: 'Atlas Azur' },
    categories: ['residence', 'mixed'],
    city: { tr: 'İstanbul', en: 'Istanbul' },
    district: { tr: 'Mimaroba', en: 'Mimaroba' },
    country: 'TR',
    coords: [41.026, 28.57],
    scope: { tr: ['Mimari proje', 'Karma kullanım'], en: ['Architecture', 'Mixed use'] },
    color: '#8f9294',
    featured: true,
    summary: {
      tr: 'Manzaranın kütleleri yerleştirdiği, komşuluk ilişkisinin ortak alanlarla güçlendiği karma kullanımlı bir yaşam alanı.',
      en: 'A mixed-use residential scheme where the view shapes the massing and shared spaces strengthen neighbourly life.',
    },
    body: {
      tr: [
        "İstanbul Mimaroba mahallesinde bulunan yapının tasarım aşamasında manzara faktörü kütlelerin araziye yerleşiminde etken rol oynamıştır. İstanbul'un diğer ilçelerine oranla komşuluk ilişkisinin daha önemli olduğu Mimaroba'da ortak kullanım alanlarının ve sosyal alanların tasarımı önem kazanmıştır.",
        'Karma kullanımlı yapıda zemin katlar ticari kullanımla zenginleştirilerek üst katlar konut kullanımına ayrılmıştır. Cephede açık renkli tuğla ve ona uyumlu koyu renkli malzeme seçimiyle kontrast ve güçlü bir etki verilmiştir.',
      ],
      en: [
        "In this building in Istanbul's Mimaroba neighbourhood, the view was a decisive factor in placing the volumes on the site. In Mimaroba, where neighbourly relations matter more than in many other districts of Istanbul, the design of shared and social spaces became a priority.",
        'Ground floors are enriched with retail while the upper floors are dedicated to housing. On the façade, light-coloured brick paired with a darker companion material creates a strong, contrasting expression.',
      ],
    },
  },
  {
    slug: 'otel-lusso',
    oldSlug: 'otel-lusso',
    title: { tr: 'Otel Lusso', en: 'Hotel Lusso' },
    categories: ['hotel', 'interior'],
    country: 'TR',
    scope: { tr: ['İç mimari', 'Aydınlatma', 'Mobilya'], en: ['Interior design', 'Lighting', 'Furniture'] },
    color: '#3a486a',
    featured: true,
    summary: {
      tr: 'Ahşabın sıcaklığı, mavi-yeşil tonlar ve Art-Deco esintili geometriyle misafirine kendini özel hissettiren bir şehir oteli.',
      en: 'A city hotel that makes every guest feel special — warm timber, blue-green tones and Art Deco–inspired geometry.',
    },
    body: {
      tr: [
        'Şehir oteli konseptiyle yola çıktığımız bu projede ana amaç misafirlere kendilerini özel hissettirmekti. Ahşabın sıcaklığıyla bütünleşen mavi-yeşil tonlarıyla doğayı içeriye buyur ettik. Kullanılan geometriyle birlikte gelen Art-Deco esintileri tasarımın çıkış noktasıydı.',
        'Malzeme seçimleri çok önemliydi; bütün malzemelerin A sınıfı olmasına özen gösterildi. Aydınlatma elemanı olarak kullanılan sarkıtların yanı sıra gizli LED aydınlatmalarla dinlendirici bir atmosfer sağlandı. Planda ortada konumlandırılan küvetle manzaranın tadını çıkarmak mümkün kılındı.',
        'Konuklar kendilerini ne kadar özel hissederse projemiz de o kadar özel olacaktı. Gittikleri diğer şehir otellerinden daha özel hissini yakalayabilmek önemliydi.',
      ],
      en: [
        'Starting from the idea of a city hotel, our main goal was to make guests feel special. Blue-green tones blended with the warmth of timber invite nature inside, while Art Deco hints carried by the geometry were the starting point of the design.',
        'Material choices were critical, and every material was specified to the highest grade. Pendant fixtures and concealed LED lighting create a restful atmosphere, and a bathtub placed at the centre of the plan lets guests enjoy the view.',
        'The more special guests feel, the more special the project becomes — the aim was a feeling distinct from any other city hotel they have stayed in.',
      ],
    },
  },
  {
    slug: 'coordinat-bornova-ic-mekan',
    oldSlug: 'coordinat-bornova-ic-mekan',
    title: { tr: 'Coordinat Bornova İç Mekân', en: 'Coordinat Bornova Interiors' },
    categories: ['interior', 'hotel', 'residence'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Bornova', en: 'Bornova' },
    country: 'TR',
    coords: [38.4697, 27.2211],
    scope: { tr: ['İç mimari', 'Ortak alanlar', 'Konaklama birimleri'], en: ['Interior design', 'Common areas', 'Living units'] },
    color: '#c9b14d',
    summary: {
      tr: 'Öğrenciler için otel konseptli bir “ev”: genç ve dinamik kullanıcıya yalnızca bir oda değil, bir yaşam.',
      en: 'A hotel-concept “home” for students — offering young, dynamic residents not just a room but a way of living.',
    },
    body: {
      tr: [
        'Coordinat Bornova projemizde genç ve dinamik kullanıcı kitlemizin ihtiyaçları göz önünde bulundurulmuştur. Bu bağlamda klasik yaklaşımlar yeniden ele alınarak onlara yalnızca bir konut değil, bir yaşam tasarlanmıştır.',
        "Öğrencilere özel, otel konseptli bir 'ev' — otel ile ev arasında bir ara model oluşturularak kullanıcı istekleri tasarımda ana girdi olarak ele alınmıştır. Ortada peyzaj alanı oluşturulmuş, alan çeşitli sosyal donatılarla beslenmiştir. Kullanıcıların bu alanda daha çok vakit geçirecekleri öngörülmüştür.",
      ],
      en: [
        'At Coordinat Bornova we started from the needs of a young and dynamic community. Conventional approaches were rethought to design not just housing but a way of living.',
        'A hotel-concept “home” dedicated to students: an intermediate model between hotel and home, with residents’ wishes taken as the primary design input. A landscaped courtyard at the centre is fed by a range of social amenities, anticipated to become the place where residents spend most of their time.',
      ],
    },
  },
  {
    slug: 'otel-deco',
    oldSlug: '7047-2',
    title: { tr: 'Otel Deco', en: 'Hotel Deco' },
    categories: ['hotel', 'interior'],
    country: 'TR',
    scope: { tr: ['İç mimari', 'Özel tasarım donatı'], en: ['Interior design', 'Bespoke fittings'] },
    color: '#784d47',
    summary: {
      tr: 'Minimum metrekarede maksimum işlev: dönen metal profilin kimi zaman askı, kimi zaman aydınlatma olduğu bir şehir oteli odası.',
      en: 'Maximum function in minimum floor area — a city hotel room where a single metal profile becomes a clothes rail here and a light fitting there.',
    },
    body: {
      tr: [
        'Günümüzde tasarımda düşük bütçeler bizleri minimalizm akımına yöneltmektedir. Minimalizm sözcüğü Fransızcadaki minimum kelimesinden türemiştir; mimaride “en az malzemeyle, en yalın, en ekonomik, en işlevsel sonuca gitmek” olarak tanımlanabilir.',
        "Le Corbusier'nin savunduğu işlevsellik olgusu altında insanların yaşadığı metrekare azalmış, yaşam alanlarının işlevselliği artmıştır. Günümüz şehir hayatının getirdiği nüfus sorunu, şehir otellerine de çok oda, oda başına en düşük metrekare ve işlevselliği yüksek mekânlar olarak yansımıştır.",
        'Plan şemasında alanlar minimum metrekare ihtiyacına uygun yerleştirilmiş; odada dikey ve yatay dönen metal donatı estetik kaygının yanı sıra fonksiyonel kullanım sağlamıştır. Metal profil kimi yerde elbise askısına dönüşürken kimi yerde aydınlatma elemanına dönüşmüştür.',
      ],
      en: [
        'Today, tight budgets lead us towards minimalism. Derived from the French word minimum, minimalism in architecture can be defined as reaching the simplest, most economical and most functional result with the least material.',
        "Under the idea of functionality championed by Le Corbusier, the floor area we live in has shrunk while the functionality of living spaces has grown. The density of contemporary city life is mirrored in city hotels: many rooms, the smallest possible area per room and highly functional spaces.",
        'Spaces are arranged to match minimum area requirements, and a metal element that turns vertically and horizontally through the room serves both aesthetic and practical ends — becoming a clothes rail in one place and a light fitting in another.',
      ],
    },
  },
  {
    slug: 'ilayda-avantgarde',
    oldSlug: 'ilayda-avantgarde-otel-ic-mekan',
    title: { tr: 'İlayda Avantgarde Otel', en: 'İlayda Avantgarde Hotel' },
    categories: ['hotel', 'interior'],
    city: { tr: 'Aydın', en: 'Aydın' },
    district: { tr: 'Kuşadası', en: 'Kuşadası' },
    country: 'TR',
    coords: [37.8579, 27.261],
    year: 2013,
    scope: { tr: ['Yeniden işlevlendirme', 'İç mimari', 'Cephe'], en: ['Adaptive reuse', 'Interior design', 'Façade'] },
    color: '#5c5c5c',
    featured: true,
    summary: {
      tr: "Kuşadası kruvaziyer limanının karşısında, 1980'lerin tatil oteline yeni bir kimlik.",
      en: 'A new identity for a 1980s holiday hotel facing the Kuşadası cruise port.',
    },
    body: {
      tr: [
        "İlayda Avantgarde Otel, Kuşadası kruvaziyer limanının karşısında, kıyı şeridinde yer almaktadır. Yapı 1980'li yılların başında bir tatil oteli olarak Mimar Salih Zeki Pekin tarafından tasarlanmıştır.",
        "Zamanla Kuşadası'nın büyüyüp gelişmesi ve değişen koşullar nedeniyle yapıya yeni bir kimlik kazandırma kararı alınmıştır. Koyu doğal taş, sıcak ahşap ve kontrollü aydınlatma; oda, koridor ve ortak alanlarda denizle kurulan ilişkiyi yeniden tanımlar.",
      ],
      en: [
        'İlayda Avantgarde Hotel sits on the shoreline opposite the Kuşadası cruise port. The building was designed in the early 1980s as a holiday hotel by architect Salih Zeki Pekin.',
        "As Kuşadası grew and conditions changed, the decision was taken to give the building a new identity. Dark natural stone, warm timber and carefully controlled lighting redefine the relationship with the sea across rooms, corridors and shared spaces.",
      ],
    },
  },
  {
    slug: 'fenix84-antalya',
    oldSlug: 'fenix_84-rezidans_mimarisi-residence_architecture-konut_mimarisi-antalya',
    title: { tr: 'Fenix84 Antalya', en: 'Fenix84 Antalya' },
    categories: ['residence', 'interior', 'competition'],
    city: { tr: 'Antalya', en: 'Antalya' },
    country: 'TR',
    coords: [36.8969, 30.7133],
    year: 2017,
    client: 'Fenix A.Ş.',
    status: { tr: 'Temeli 2017’de atıldı', en: 'Groundbreaking 2017' },
    scope: { tr: ['Kentsel dönüşüm', 'Mimari proje', 'İç mimari'], en: ['Urban regeneration', 'Architecture', 'Interior design'] },
    color: '#ab6162',
    featured: true,
    summary: {
      tr: 'Özel sektör eliyle gerçekleştirilen, ada bazında Türkiye’nin en büyük kentsel dönüşüm projesi.',
      en: 'Turkey’s largest block-scale urban regeneration project undertaken by the private sector.',
    },
    body: {
      tr: [
        "Tarihi itibarıyla ada bazındaki en büyük kentsel dönüşüm projesi olan Fenix84, Antalya'nın merkezi bir lokasyonunda yer almaktadır. Projenin temeli, Türkiye'de özel sektör tarafından gerçekleştirilen ada bazında en büyük kentsel dönüşüm projesi olma unvanıyla 2017 yılında atıldı.",
        'Yapı yoğunluğunun yüksek olduğu projede DEMİRCE olarak kullanıcı konforunu ön planda tuttuk. Mimarlığın yaşam kurma sanatı olduğunun farkındalığıyla hareket ettik. Genel kütle kararlarından iç mekândaki bir detaya kadar kullanıcılara özel bir yaşam tasarladık.',
      ],
      en: [
        "Located in central Antalya, Fenix84 was, at the time, the largest urban regeneration project at city-block scale. Its foundation was laid in 2017 as Turkey's largest block-scale regeneration project carried out by the private sector.",
        'In a scheme with high building density, we kept residents’ comfort at the forefront, guided by the belief that architecture is the art of building a life. From the overall massing decisions down to an interior detail, we designed a life tailored to its residents.',
      ],
    },
  },
  {
    slug: 'coordinat-bornova',
    oldSlug: 'coordinat-bornova',
    title: { tr: 'Coordinat Bornova', en: 'Coordinat Bornova' },
    categories: ['mixed', 'residence', 'hotel', 'interior'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Bornova', en: 'Bornova' },
    country: 'TR',
    coords: [38.4697, 27.2211],
    scope: { tr: ['Mimari proje', 'İç mimari', 'Peyzaj'], en: ['Architecture', 'Interior design', 'Landscape'] },
    color: '#d6c943',
    featured: true,
    summary: {
      tr: 'Otel ile ev arasında yeni bir model: ortasında peyzajlı avlusu olan, öğrencilere özel bir yaşam kampüsü.',
      en: 'A new model between hotel and home: a student living campus organised around a landscaped courtyard.',
    },
    body: {
      tr: [
        'Coordinat Bornova projemizde genç ve dinamik kullanıcı kitlemizin ihtiyaçları göz önünde bulundurulmuştur. Bu bağlamda klasik yaklaşımlar yeniden ele alınarak onlara yalnızca bir konut değil, bir yaşam tasarlanmıştır.',
        "Öğrencilere özel, otel konseptli bir 'ev' — otel ile ev arasında bir ara model oluşturularak kullanıcı istekleri tasarımda ana girdi olarak ele alınmıştır. Ortada peyzaj alanı oluşturulmuş, alan çeşitli sosyal donatılarla beslenmiştir. Kullanıcıların bu alanda daha çok vakit geçirecekleri öngörülmüştür.",
      ],
      en: [
        'At Coordinat Bornova we started from the needs of a young and dynamic community. Conventional approaches were rethought to design not just housing but a way of living.',
        'A hotel-concept “home” dedicated to students: an intermediate model between hotel and home, with residents’ wishes as the main design input. A landscaped courtyard at the centre, fed by a variety of social amenities, is designed to be where life on campus happens.',
      ],
    },
  },
  {
    slug: 'sd-apartmani',
    oldSlug: 'sd-apartmani',
    title: { tr: 'SD Apartmanı', en: 'SD Apartments' },
    categories: ['residence'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Atatürk Mahallesi', en: 'Atatürk district' },
    country: 'TR',
    scope: { tr: ['Mimari proje', 'Cephe tasarımı'], en: ['Architecture', 'Façade design'] },
    color: '#37687b',
    summary: {
      tr: 'Güneş kırıcı panellerin dolu-boş dengesiyle mahremiyet ve manzarayı aynı cephede buluşturan bir konut.',
      en: 'A residential building whose brise-soleil panels balance solid and void — privacy and view on the same façade.',
    },
    body: {
      tr: [
        "Proje arazisi İzmir'in Atatürk Mahallesi'nde yer almaktadır. Cephe kurgusunda öne çıkan güneş kırıcı paneller kullanıcılara güvenli ve özel bir alan oluştururken yapının manzaradan yararlanmasını sağlamıştır.",
        'Bu paneller kullanılırken belli bir oran yakalanmış, dolu-boş dengesi gözetilmiş ve net bir geometri algısı oluşturulmuştur.',
      ],
      en: [
        "The site is in İzmir's Atatürk district. The brise-soleil panels that define the façade create a safe, private realm for residents while letting the building enjoy the view.",
        'The panels follow a clear proportion, balancing solid and void to create a crisp geometric reading.',
      ],
    },
  },
  {
    slug: 'borncity',
    oldSlug: 'borncity-rezidans-otel',
    title: { tr: 'Borncity Rezidans & Otel', en: 'Borncity Residence & Hotel' },
    categories: ['mixed', 'residence', 'hotel', 'interior'],
    country: 'TR',
    scope: { tr: ['Program geliştirme', 'Mimari proje', 'İç mimari'], en: ['Programming', 'Architecture', 'Interior design'] },
    color: '#dc8a46',
    featured: true,
    summary: {
      tr: 'L formlu tek kütlede kısa kol otel, uzun kol rezidans: otel konforunu konutla gerçekten birleştiren bir program.',
      en: 'One L-shaped volume — the short arm a hotel, the long arm residences: a programme that truly merges hotel comfort with living.',
    },
    body: {
      tr: [
        'Rezidans kavramı, genel hatlarıyla otel konforunun konutlarda sağlanması söylemi olarak özetlenebilir. Bu sebeple Borncity projemizde rezidans kavramı üzerine gidilerek program yeniden ele alınmış; konut işlevi beklenen alanda otel ve konutu bir arada çözen gerçek bir rezidans çözümüne gidilmiştir.',
        'Yerleşimde arazinin getirisi olarak L formlu bir kütle kurgulanmış; L kütlenin kısa kolu otel, uzun kolu ise rezidans olacak şekilde programlanmıştır.',
      ],
      en: [
        'The idea of a “residence” can be summed up as hotel-level comfort delivered in homes. At Borncity we took that idea seriously and rethought the brief: on a site expected to host housing, we delivered a genuine residence that combines hotel and home.',
        'Following the logic of the site, the building is an L-shaped volume — its short arm programmed as a hotel and its long arm as residences.',
      ],
    },
  },
  {
    slug: 'mezitli-egitim-kampusu',
    oldSlug: 'mersin-mezitli-egitim-kampusu-yarismasi-1-odul',
    title: { tr: 'Mersin Mezitli Eğitim Kampüsü', en: 'Mersin Mezitli Education Campus' },
    categories: ['education', 'mixed', 'competition'],
    city: { tr: 'Mersin', en: 'Mersin' },
    district: { tr: 'Mezitli', en: 'Mezitli' },
    country: 'TR',
    coords: [36.7426, 34.5287],
    year: 2013,
    client: 'T.C. Milli Eğitim Bakanlığı',
    award: { tr: 'Birincilik Ödülü', en: 'First Prize' },
    status: { tr: 'Ulusal mimari proje yarışması', en: 'National architectural competition' },
    scope: { tr: ['Kampüs master planı', 'Mimari proje', 'Sürdürülebilir tasarım'], en: ['Campus master plan', 'Architecture', 'Sustainable design'] },
    color: '#898943',
    featured: true,
    summary: {
      tr: 'Antik Soli kentinin 200 sütunlu caddesine atıfla kurgulanan bir “omurga”: kentle bütünleşen, güneşin kentine yakışır bir kampüs.',
      en: 'A pedestrian “spine” referencing the 200-column street of ancient Soli — a campus that belongs to the city of the sun.',
    },
    body: {
      tr: [
        'M.E.B. Eğitim Kampüsleri Mimari Proje Yarışması — Mersin Mezitli Eğitim Kampüsü, Birincilik Ödülü.',
        '## Eğitim sistemi ve gençler',
        'Mimari bir kurgudan evvel eğitimin ve öğretimin günümüz koşullarında nasıl yapıldığı ve bu süreçte elde edilen deneyimlere dayanılarak problemlerin nerede ve ne şekilde ortaya çıktığı belirlenmelidir. Eğitim sistemi ezbercilikten kaçan, teorik anlatımın yanında pratiğe de önem veren; bilginin aktarıldığı değil, paylaşıldığı ve paylaşıldıkça çoğaldığı bir sistem üzerine kurulmalıdır.',
        'Öğrencilerin bireysel ve grup çalışmalarında kurgunun içine dâhil edildiği, yaşayarak öğrenme temeline dayanan interaktif bir sistem öncelikli amaç olmalıdır. Eğitim öğrenci odaklı ve demokratik olmalı; başkasının kişisel haklarını ihmal etmeyen nitelikte esneklik ve özgürlük sağlamalıdır.',
        '## Güneşin kenti Mezitli',
        "Mersin'in batısında kalan Soli-Pompeiopolis, Mezitli ilçesinin en önemli ören yerlerinden biridir ve geçmişten bugüne pek çok uygarlığa ev sahipliği yapmıştır. Antik kentin en önemli yapısı, Roma döneminde yapılmış 200 sütunlu, kuzey-güney yönünde uzanan Sütunlu Cadde ve çevresinde konumlanan liman, hamam ve tiyatro gibi kalıntılardır. Bu cadde geçmişte fikirlerin paylaşıldığı, sanat eserlerinin sergilendiği bir alan olarak kullanılmıştır. Kentin güneş aldığı gün sayısı fazladır; her yıl ilçede güneş festivali düzenlenmektedir.",
        '## Tasarım ilkeleri',
        'Tarihi sütunlu cadde kampüs tasarımının çıkış noktasını oluşturur; kurgulanan OMURGA ile bu caddeye mimari atıfta bulunulur. Proje alanının sonradan çıkarılan kısmı bir avantaja dönüştürülerek öğrencilerin ve kentlinin serbest dolaşımına açık, yoğun peyzajlı bir KENT PARKI olarak tasarlanmıştır; bu alan kampüs içindeki ekolojik sirkülasyonun kaynağıdır.',
        'Kent parkından başlayıp kuzeybatıdaki sosyal etkinlik meydanına bağlanan YAYA OMURGASI boyunca tüm fonksiyonlar bu omurgaya takılır; hayat bu omurga boyunca şekillenir. Eğitim blokları ile sosyal merkezin eklemlendiği yerlerde arazi eğiminden doğan küçük amfiler, oturma alanları ve zemin koduyla buluşan yeşil çatılar alt ve üst kot ilişkisinin sürekliliğini sağlar.',
        'Omurganın güneyinde derslikler, kuzeyinde ise arazi eğiminin içine gömülen yemekhane, kütüphane, kulüp odaları, kantin, sağlık merkezi ve yönetim birimleri yer alır. Bu mekânların kendi iç bahçeleri oluşturularak iç-dış ilişkileri zenginleştirilmiş, çatıları yeşil çatı olarak tasarlanmıştır.',
        '## Sürdürülebilirlik',
        'Akdeniz iklimi nedeniyle eğitim yapıları zemin katta geri çekilerek revaklı geçitler oluşturulmuş, sosyal donatıların çatı saçakları öne çıkarılarak gölgeli yarı açık mekânlar yaratılmıştır. Serinletme havuzları ve geniş yapraklı ağaçlar kampüsün iklimlendirilmesine katkı sağlar. Eğitim blokları omurga boyunca birbirinden koparılarak denize açılan vistalar yaratılmış; deniz yönünden esen rüzgâr kampüsün içine alınarak doğal havalandırma sağlanmıştır.',
        'Sulama gerektirmeyen bitkilerle yeşil çatılar, sıcak su için güneş kolektörleri, elektrik için güneş pilleri, yağmur suyu ve gri su geri kazanımı, gün ışığı kullanımı ve aydınlatma otomasyonu öngörülmüştür. Sürdürülebilir sistemlerin ilk yatırım maliyetini %5–10 artırması, buna karşılık işletmede %50–70’e varan enerji tasarrufu sağlaması ve yatırımın 2–3 yılda geri dönmesi hedeflenmiştir.',
        'Kampüsün gelecekteki büyümesine olanak tanıyan, 3’lü ve 4’lü modüllerden oluşan ve üreyebilen bir mimari kurgu tercih edilmiştir. Kampüs girişindeki Kent Meydanı; spor merkezi, konferans salonu ve kütüphanesiyle okul saatleri dışında kentlinin kullanımına açılabilecek, Güneş Festivali gibi etkinliklere ev sahipliği yapacak şekilde tasarlanmıştır.',
      ],
      en: [
        'Ministry of National Education Campus Competition — Mersin Mezitli Education Campus, First Prize.',
        '## Education and young people',
        'Before any architectural scheme, we must understand how teaching and learning happen today, and where problems arise. Education should move away from rote learning, value practice as much as theory, and be built on a system where knowledge is not transmitted but shared — and multiplies as it is shared.',
        'An interactive system based on learning by doing, where students are part of the process both individually and in groups, should be the priority. Education should be student-centred and democratic, offering flexibility and freedom without neglecting the rights of others.',
        '## Mezitli, city of the sun',
        'West of Mersin lies Soli-Pompeiopolis, one of the most important archaeological sites in Mezitli, home to many civilisations over the centuries. Its most significant structure is the Roman Colonnaded Street with 200 columns running north–south, surrounded by the remains of a harbour, baths and theatre. The street was once a place to share ideas and display works of art. With so many sunny days a year, the district hosts an annual Sun Festival.',
        '## Design principles',
        'The colonnaded street is the starting point of the campus: a SPINE makes an architectural reference to it. The portion later removed from the site is turned into an advantage — a densely planted CITY PARK open to both students and the public, and the source of the ecological flow through the campus.',
        'A PEDESTRIAN SPINE runs from the city park to the social events square in the north-west, and every function plugs into it; life on campus takes shape along it. Where teaching blocks meet the social centre, small amphitheatres, seating areas and green roofs that meet the ground keep the upper and lower levels continuous.',
        'Classrooms sit south of the spine; to the north, the dining hall, library, club rooms, canteen, health centre and administration are set into the slope, each with its own courtyard and a green roof.',
        '## Sustainability',
        'Responding to the Mediterranean climate, teaching blocks are set back at ground level to form arcades, and deep eaves create shaded semi-open spaces. Cooling pools and broad-leaved trees help temper the microclimate. Blocks are separated along the spine to open views to the sea and draw sea breezes through the campus for natural ventilation.',
        'Green roofs with drought-tolerant planting, solar thermal and photovoltaic panels, rainwater and greywater recycling, daylighting and lighting automation are proposed. These systems were estimated to add 5–10% to construction cost while cutting operating energy by up to 50–70%, paying back within 2–3 years.',
        'A modular, expandable system of three- and four-unit clusters allows the campus to grow. The City Square at the entrance — with sports centre, conference hall and library — can open to residents outside school hours and host events such as the Sun Festival.',
      ],
    },
    diagrams: [7, 8, 9, 10, 11, 12, 13],
  },
  {
    slug: 'folkart-life-bornova',
    oldSlug: 'folkart-life-bornova-2',
    title: { tr: 'Folkart Life', en: 'Folkart Life' },
    categories: ['residence', 'interior', 'competition'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Bornova', en: 'Bornova' },
    country: 'TR',
    coords: [38.4555, 27.2105],
    scope: { tr: ['Mimari proje', 'Peyzaj', 'İç mimari'], en: ['Architecture', 'Landscape', 'Interior design'] },
    color: '#984a4a',
    summary: {
      tr: 'Hâkim rüzgâr ve güneş hareketine göre yönlenen, geniş teraslarıyla kente farklı vistalar açan kütleler.',
      en: 'Volumes oriented to the prevailing wind and the path of the sun, opening new vistas over the city from generous terraces.',
    },
    body: {
      tr: [
        "Folkart Life Bornova, konumu itibarıyla İzmir'de prestij ve dinamizmin buluştuğu bir bölgede yer almaktadır.",
        'Projede çevresel veriler öncelikli tasarım girdisi olarak kullanıldı. Hâkim rüzgâr yönünü ve güneş hareketlerini dikkate alan bir yönelim kurgulandı. Konutların manzaradan en iyi biçimde yararlanabilecekleri bir arazi yerleşim şeması oluşturuldu. Geniş teraslarla kente farklı vistalar vermek hedeflendi.',
      ],
      en: [
        'Folkart Life Bornova is located in a part of İzmir where prestige and dynamism meet.',
        'Environmental data was the primary design input. The orientation responds to the prevailing wind and the movement of the sun, and the site plan lets every home make the most of the view. Generous terraces offer the city new vistas.',
      ],
    },
    diagrams: [10, 11],
  },
  {
    slug: 'la-bonita-cigli',
    oldSlug: 'la-bonita-cigli-2',
    title: { tr: 'La Bonita Çiğli', en: 'La Bonita Çiğli' },
    categories: ['residence', 'mixed'],
    city: { tr: 'İzmir', en: 'İzmir' },
    district: { tr: 'Çiğli', en: 'Çiğli' },
    country: 'TR',
    coords: [38.495, 27.06],
    scope: { tr: ['Mimari proje', 'İç mimari', 'Peyzaj'], en: ['Architecture', 'Interior design', 'Landscape'] },
    color: '#5255a3',
    summary: {
      tr: 'Arazinin çeperine oturan kütle, havuz ve sosyal alanlarla zenginleşen ortadaki peyzajla bir konut projesini yaşam projesine dönüştürür.',
      en: 'A perimeter block around a landscaped heart with pool and social spaces — turning a housing scheme into a living project.',
    },
    body: {
      tr: [
        'Arazinin çeperlerine oturacak şekilde tasarlanan yapıda farklı konut tipleri ve ticari alanlar bir arada bulunmaktadır. Projenin orta kısmında bırakılan peyzaj alanı, havuz etrafındaki sosyal alanlarla zenginleşerek konut projesini yaşam projesine dönüştürmüştür.',
        'Kentsel planlamada verilmiş olan kat sınırlaması ve yüksek emsal miktarı, projede kullanıcı gereksinimleri ile yeşil ve yapı oranı arasında hassas bir denge kurmayı gerektirmiştir.',
      ],
      en: [
        'Designed to sit on the edges of the plot, the building brings together a variety of housing types and commercial space. The landscaped area left at the centre, enriched by social spaces around the pool, transforms a housing scheme into a project about living.',
        'The height limit and high floor-area ratio set by the zoning plan called for a careful balance between residents’ needs and the ratio of green space to built form.',
      ],
    },
    diagrams: [16],
  },
  {
    slug: 'tlp-evi',
    oldSlug: 'tlp-house',
    title: { tr: 'TLP Evi', en: 'TLP House' },
    categories: ['residence', 'interior'],
    country: 'TR',
    scope: { tr: ['İç mimari', 'Renk & malzeme'], en: ['Interior design', 'Colour & materials'] },
    color: '#cca412',
    summary: {
      tr: 'Natürel tonların arasından patlayan sarı: grinin kontrastıyla atmosferi değiştiren bir konut iç mekânı.',
      en: 'A burst of yellow among natural tones — a home interior whose atmosphere is transformed by contrast with grey.',
    },
    body: {
      tr: [
        'Natürel tonların arasından patlayan canlı renk mekânın atmosferini değiştirir. Bu projede gri tonlamalarla kontrast yakalayan sarı renk tercih edildi.',
        'Dış mekânla bütünleşen ve güneş ışığını verimli bir şekilde kullanan konutun plan yerleşiminde kullanıcı konforu göz önünde bulunduruldu.',
      ],
      en: [
        'A vivid colour bursting from natural tones changes the atmosphere of a space. Here, yellow was chosen to contrast with shades of grey.',
        "The plan, open to the outdoors and making efficient use of daylight, was shaped around the residents' comfort.",
      ],
    },
  },
  {
    slug: 'd-life-pandora',
    oldSlug: 'd-life-pandora',
    title: { tr: 'D-Life Pandora', en: 'D-Life Pandora' },
    categories: ['residence'],
    city: { tr: 'Denizli', en: 'Denizli' },
    district: { tr: 'Çamlık', en: 'Çamlık' },
    country: 'TR',
    coords: [37.7765, 29.0864],
    scope: { tr: ['Mimari proje', 'Cephe tasarımı'], en: ['Architecture', 'Façade design'] },
    color: '#b4822d',
    summary: {
      tr: 'Her konutta farklı bir plan tipinin çözüldüğü, cephe panelleriyle karakter kazanan butik bir konut projesi.',
      en: 'A boutique residential project where every home has its own plan type, given character by its façade panels.',
    },
    body: {
      tr: [
        "Denizli'nin önemli ve özgün bir bölgesi olan Çamlık'ta, bizden oraya ait bir proje tasarlamamız istendi. Her konutta farklı plan tipinin çözüldüğü butik bir proje tasarlandı.",
        'Cephede kullanılan panellerle yapıya karakteristik bir dil kazandırıldı.',
      ],
      en: [
        "In Çamlık, a distinctive part of Denizli, we were asked to design a project that truly belongs to its place. The result is a boutique scheme in which every home has a different plan type.",
        'Panels on the façade give the building a characteristic architectural language.',
      ],
    },
  },
  {
    slug: 'ural-houses-kazakistan',
    oldSlug: 'ypa%d0%bb-houses-kazakistan',
    title: { tr: 'YPAЛ Houses', en: 'YPAЛ (Ural) Houses' },
    categories: ['residence'],
    city: { tr: 'Atırav', en: 'Atyrau' },
    country: 'KZ',
    coords: [47.0945, 51.9238],
    status: { tr: 'İnşa edildi', en: 'Built' },
    scope: { tr: ['Mimari proje', 'İklime duyarlı tasarım'], en: ['Architecture', 'Climate-responsive design'] },
    color: '#4a4d9a',
    featured: true,
    summary: {
      tr: 'Ural Nehri kıyısında, çok sıcak yazlara ve çok soğuk kışlara göre kurgulanmış bir konaklama ve konut projesi.',
      en: 'Housing on the banks of the Ural River, designed for very hot summers and very cold winters.',
    },
    body: {
      tr: [
        "Proje, Kazakistan'ın son yıllarda petrol yatırımlarıyla hızla gelişen şehri Atırav'da (Atyrau) inşa edildi. Altyapısı henüz gelişmekte olan şehirde üst düzey kullanıcı potansiyelini karşılayabilme ihtiyacı inşaat sektörünü canlandırdı; biz de kentin artan geçici konaklama ihtiyacına cevap niteliğinde bir tasarım yaptık.",
        'Çevresel verileri tasarımımızda girdi olarak kullandık. Arazi, kent için simge olan Ural Nehri’nin yanında yer almaktadır. Yazları çok sıcak, kışları çok soğuk olan kentte iklimsel özellikleri göz önünde bulundurarak bir tasarım kurguladık.',
      ],
      en: [
        "The project was built in Atyrau, a Kazakh city that has grown rapidly with oil investment in recent years. In a city whose infrastructure was still developing, the need to serve high-end users energised the construction sector — and our design responds to the city's growing demand for temporary accommodation.",
        "Environmental data was a key input. The site lies beside the Ural River, a symbol of the city. In a place with very hot summers and very cold winters, the design was shaped around the climate.",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Yerleşim yeri (harita / liste) etiketi */
export const placeLabel = (p: Project, lang: Lang) =>
  [p.district?.[lang], p.city?.[lang]].filter(Boolean).join(', ') || (lang === 'tr' ? '—' : '—');

export const countryName = (c: Project['country'], lang: Lang) =>
  c === 'KZ' ? (lang === 'tr' ? 'Kazakistan' : 'Kazakhstan') : 'Türkiye';
