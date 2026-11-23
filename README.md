# DEMİRCE Mimarlık — www.demirce.com

DEMİRCE Mimarlık'ın yeni web sitesi. Eski WordPress sitesindeki tüm projeler, metinler ve görseller taşındı; site sıfırdan, hızlı, iki dilli (TR/EN) ve bakımı kolay bir statik site olarak yeniden tasarlandı.

> **Tasarım kavramı — “Pafta”:** Site bir mimari çizim seti gibi okunur. Her sayfanın bir pafta kodu vardır (A-00, A-10…), altbilgide gerçek bir antet (title block) bulunur, arka planda ince çizim ızgarası görünür. Tipografi logodaki dar harflerle uyumlu **Saira**, teknik notlar için **JetBrains Mono**. Vurgu rengi eski sitedeki DEMİRCE macentası (#e42382). Her projenin kendi kimlik rengi vardır.

---

## Öne çıkan özellikler

### Sıra dışı fikirler
| Özellik | Açıklama |
|---|---|
| **Canlı Güneş Çalışması** (ana sayfa) | Three.js ile beyaz bir çalışma maketi. Alsancak ofisinin koordinatlarında güneşin **o anki gerçek konumu** hesaplanır; gölgeler canlıdır. Saat kaydırıcısı, 21 Mart / 21 Haziran / 21 Aralık, “Günü oynat”, geceleri yanan pencereler ve İzmir'in **İmbat** meltemini gösteren rüzgâr katmanı. |
| **Pafta teması** | Açık / Koyu temalara ek olarak tüm siteyi ozalit (blueprint) çizime dönüştüren üçüncü tema. 3B maket de çizgi görünümüne geçer. |
| **Arsa Potansiyeli Hesaplayıcı** (`/fizibilite/`) | Arsa alanı, emsal, TAKS ve kat sınırıyla inşaat alanı, kat adedi, yükseklik, açık alan ve tipolojiye göre daire / oda / çalışma alanı kapasitesi; izometrik kütle önizlemesi. Sonuç paylaşılabilir bağlantı olur ve tek tıkla iletişim formuna aktarılır. |
| **İlham Panosu** (`/pano/`) | Proje galerilerindeki her görselde ♥ düğmesi. Ziyaretçi kendi panosunu oluşturur, bağlantıyla paylaşır ya da iletişim formuna ekleyerek ofise gönderir. Veriler yalnızca ziyaretçinin tarayıcısında saklanır. |
| **Komut paleti** (`⌘K` / `Ctrl+K` / `/`) | Projeler, sayfalar, yazılar ve komutlar (tema, dil) arasında Türkçe karakter duyarsız anlık arama. |
| **Proje haritası** | İzmir'den Atırav'a tüm proje konumları; derleme anında üretilen SVG — üçüncü taraf harita servisi ve çerez yok. |
| **“Alsancak'ta şimdi”** | İletişim sayfasında ofisin yerel saati ve güneşin anlık konumu. |

### Modern web standartları
- **Performans:** Statik HTML, sayfa başına birkaç KB JavaScript. Three.js yalnızca ana sayfa kahraman alanı görünür olduğunda tembel yüklenir. Görseller derlemede WebP'ye çevrilip `srcset` ile boyutlandırılır. Fontlar siteden sunulur, ön yüklenir.
- **Sayfa geçişleri:** View Transitions API ile proje kartı → proje sayfası arasında görsel morfu; filtrelemede yumuşak geçiş.
- **Anında açılan sayfalar:** Speculation Rules API ile bağlantılar üzerine gelindiğinde önceden yüklenir.
- **Kaydırmayla canlanma:** CSS scroll-driven animations (aşamalı geliştirme, desteklemeyen tarayıcıda sorunsuz).
- **PWA:** Web uygulaması manifesti, ana ekrana eklenebilir, service worker ile çevrimdışı çalışma.
- **SEO:** Sayfa başına başlık/açıklama, canonical, `hreflang` (TR/EN), Open Graph görselleri, JSON-LD (LocalBusiness, CreativeWork, BlogPosting, FAQPage, BreadcrumbList), site haritası, RSS, robots.txt.
- **Eski adresler korunur:** Eski WordPress adreslerinin tümü (`/portfolio/...`, `/portfolyo/`, blog yazıları, `/feed/`) yeni adreslere **301** ile yönlendirilir (`public/.htaccess`, `public/_redirects`).
- **Erişilebilirlik:** Anlamsal HTML, klavyeyle tam kullanım, odak göstergeleri, “içeriğe geç” bağlantısı, `prefers-reduced-motion` desteği, ekran okuyucu etiketleri.
- **Gizlilik (KVKK):** Çerez yok, izleme yok, gömülü üçüncü taraf içerik yok. KVKK aydınlatma metni sayfası.
- **Güvenlik başlıkları:** CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **İki dil:** Türkçe (`/`) ve İngilizce (`/en/`); her sayfa diğer dildeki karşılığına bağlanır.

---

## Sayfalar

| TR | EN | İçerik |
|---|---|---|
| `/` | `/en/` | Güneş çalışması, yaklaşım, seçili işler, rakamlar, hizmetler, harita, zaman çizelgesi, araçlar, günlük |
| `/projeler/` | `/en/projects/` | 16 proje — ızgara / liste / harita görünümü, kategori filtresi, arşiv endeksi |
| `/projeler/<slug>/` | `/en/projects/<slug>/` | Proje künyesi, metin, galeri + tam ekran görüntüleyici, ilgili yazılar, önceki/sonraki |
| `/ofis/` | `/en/studio/` | Hakkımızda, ilkeler, kurucular, zaman çizelgesi, ödüller & basın, kariyer |
| `/hizmetler/` | `/en/services/` | 6 hizmet alanı, süreç, tipolojiler, SSS |
| `/fizibilite/` | `/en/feasibility/` | Arsa potansiyeli hesaplayıcı |
| `/pano/` | `/en/board/` | İlham panosu |
| `/gunluk/` | `/en/journal/` | 14 yazı (eski blogdan taşındı) |
| `/iletisim/` | `/en/contact/` | İletişim formu, adres, yol tarifi |
| `/kvkk/` | `/en/privacy/` | KVKK aydınlatma metni |

---

## Geliştirme

Gereksinim: **Node.js 22.23.4 veya üzeri** (`.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # tip denetimi
npm run build     # dist/ klasörüne statik site üretir
npm run preview   # derlenmiş siteyi yerelde önizler
```

### Klasör yapısı

```
src/
  data/          site.ts (adres, telefon, sosyal medya), projects.ts, services.ts, archive.ts, timeline.ts
  content/journal/tr|en/   Günlük yazıları (Markdown)
  assets/projects/<slug>/  Proje görselleri (00.webp = kapak)
  assets/journal/          Yazı kapak görselleri
  views/         Sayfa gövdeleri (TR ve EN ortak)
  pages/         Adresler (TR kök, EN /en/)
  components/    Başlık, altbilgi, güneş çalışması, harita, galeri…
  scripts/       İstemci tarafı kodlar (3B sahne, palet, pano…)
  i18n/ui.ts     Arayüz metinleri ve sayfa adresleri
public/
  .htaccess      Apache: yönlendirmeler, güvenlik, önbellek
  _redirects, _headers   Netlify / Cloudflare Pages karşılıkları
  api/contact.php        İletişim formu işleyicisi
```

### Yeni proje eklemek
1. Görselleri `src/assets/projects/<yeni-slug>/` klasörüne `00.webp`, `01.webp`… olarak koyun (`00` kapak). Uzun kenar ~2000 px yeterli.
2. `src/data/projects.ts` dosyasında listenin başına bir kayıt ekleyin (TR ve EN başlık, özet, metin, kategori, konum, kimlik rengi).
3. Ana sayfada öne çıkarmak için `src/views/HomePage.astro` içindeki `FEATURED` listesine ekleyin.

### Yeni günlük yazısı eklemek
`src/content/journal/tr/<slug>.md` ve aynı adla `src/content/journal/en/<slug>.md` oluşturun:

```md
---
title: 'Başlık'
description: 'Kısa özet'
date: 2026-11-23
cover: ../../../assets/journal/gorsel.webp   # isteğe bağlı
project: fenix84-antalya                       # isteğe bağlı, ilgili proje
tags: ['Ödül']
---
Metin…
```

---

## Yayına alma

### Seçenek A — Mevcut hosting (cPanel / Apache + PHP)
1. `npm run build`
2. `dist/` klasörünün **içeriğini** sunucudaki `public_html/` klasörüne yükleyin (FTP veya cPanel Dosya Yöneticisi). Gizli `.htaccess` dosyasının da yüklendiğinden emin olun.
3. Eski WordPress dosyalarını yedekleyip kaldırın. Eski adresler `.htaccess` ile otomatik yönlendirilir.
4. İletişim formu `api/contact.php` ile çalışır. `contact.php` içindeki `TO_EMAIL` / `FROM_EMAIL` adreslerini kontrol edin; `FROM_EMAIL` alan adınıza ait olmalıdır (SPF/DMARC).

### Seçenek B — Cloudflare Pages / Netlify / Vercel
Depoyu bağlayın; derleme komutu `npm run build`, çıktı klasörü `dist`, Node sürümü 22. `_redirects` ve `_headers` dosyaları otomatik uygulanır. PHP çalışmayacağı için `src/data/site.ts` içindeki `formEndpoint` değerini bir form servisine (Formspree, Basin, Netlify Forms vb.) yönlendirin. Form, sunucuya ulaşamazsa ziyaretçinin e-posta uygulamasında hazır bir taslak açar; mesaj kaybolmaz.

GitHub Actions (`.github/workflows/ci.yml`) her gönderimde tip denetimi ve derleme yapar, derlenmiş siteyi indirilebilir bir “artifact” olarak saklar.

---

## Yayından önce kontrol edilmesi gerekenler
- [ ] **Kurucular / unvanlar** (`src/views/OfficePage.astro`): eski sitedeki yazılardan derlendi — Alpay Demirci ve Burçin Demirci için unvanları doğrulayın, isterseniz fotoğraf ekleyin.
- [ ] **Arşiv** (`src/data/archive.ts`) ve **zaman çizelgesi** (`src/data/timeline.ts`): eski blog kayıtlarından derlendi; yıllar, haber tarihleridir.
- [ ] **Proje yılları ve konumları**: eski sitede yer almayan bilgiler boş bırakıldı (ör. Otel Deco, Otel Lusso, TLP Evi, Borncity konumu).
- [ ] **KVKK metni** (`src/views/PrivacyPage.astro`): şablondur, hukuk danışmanınızla gözden geçirin.
- [ ] **Posta kodu** (`src/data/site.ts` → `postalCode`).
- [ ] **İletişim formu**: yayına aldıktan sonra bir deneme mesajı gönderin.
