# DEMİRCE Mimarlık — www.demirce.com

DEMİRCE Mimarlık'ın yeni web sitesi. Eski WordPress sitesindeki projeler, metinler, görseller ve yazılar taşındı; site sıfırdan, hızlı, iki dilli (TR/EN) ve bakımı kolay bir statik site olarak yeniden tasarlandı.

## Kavram — “Pafta”

Site, kesikli çizgili bir ızgaranın üzerine yerleştirilmiş bir pafta gibi okunur: keten dokulu kâğıt, Fibonacci aralıklı (233 × 144) kesikli ızgara, tek yazı tipi (JetBrains Mono), büyük harf ve iki yana yaslı küçük metin blokları. Kapak hafifçe dönük bir paftadır; ortada DEMİRCE logosu, çevresinde etiketler ve dağınık bloklar. Tamamen gri tonlamalıdır.

Önceki “Cephe” kurgusu korunur: bölümler kot işaretiyle başlar (▽ +12,80 → ±0,00), zeminde kodla çizilen çamlar ve insanlar vardır; Ofis bölümünde Vitruvius, inceleme görsellerinde altın spiral (yalnızca çizgi) yer alır.

- **Çatıdan zemine:** Her bölüm bir kattır ve kot işaretiyle başlar (▽ +16,00 → +3,20). Sayfanın sonunda zemin (±0,00) vardır: kodla çizilen çam ağaçları ve yürüyen insanlar. Zeminin altında, kesit gibi, ofisin arazisi (eş yükselti eğrileri) durur.
- **Fibonacci / altın oran (φ):** Kapaktaki duvar bir altın dikdörtgendir; dar pencere altın spiralin gözüne oturur ve her gün başka bir çalışma o pencereden görünür. İç sayfa başlıklarındaki siyah / taranmış dikdörtgen kompozisyonlar altın bölünmeden üretilir ve sayfa adına göre her seferinde aynı çıkar (`src/lib/geometry.ts`).
- **Vitruvius:** İnsan silüetleri Vitruvius oranlarıyla (boy = kulaç, baş = boyun 1/8'i) koddan çizilir; Ofis bölümünde çember, kare ve iki duruşlu figür yer alır.
- **Pencereler:** Beş derinlemesine inceleme, siyah cephe pencereleridir; içlerinde insanlar durur, üzerine gelince çalışma ve sorusu görünür.
- **Kesitler:** Tüm çalışmalar, Fibonacci açıklıklı, boşluksuz bir cephe ızgarasında; kalan boşluklar siyah, taranmış ya da boş panellerle dolar.
- **Çizgiler görsellerin üzerinde yalnızca çizgidir** (altın spiral, düzenleyici kareler); görselin önünü kapatan dolgu yoktur.
- **Sayı yok, seçki var.** Birikim ölçek (1:20 — 1:5000), oran ve süreklilikle anlatılır.
- **Görseller:** Tüm çizimler (ağaçlar, silüetler, kompozisyonlar) koddan üretilir; dışarıdan alınmış hazır görsel kullanılmaz.
- **Yazı tipleri:** Saira (dar, büyük harf başlıklar), Inter (metin), Newsreader italik (sorular), JetBrains Mono (kot, koordinat, ölçek).

## Teknik özellikler
- **Hız:** Statik HTML; çizimler derlemede SVG olarak üretilir. Tek JavaScript dosyası altbilgideki arazi çizimidir (~6,5 KB, ekrana yaklaşınca çalışır). Görseller derlemede WebP'ye çevrilip `srcset` ile boyutlandırılır; yazı tipleri siteden sunulur.
- **Akıcı gezinme:** View Transitions ile yumuşak sayfa geçişleri, Speculation Rules ile önceden yüklenen sayfalar.
- **SEO:** Sayfa başına başlık/açıklama, canonical, `hreflang`, Open Graph görselleri, JSON-LD (LocalBusiness, Article, CreativeWork, BreadcrumbList), site haritası, RSS, robots.txt, web uygulaması manifesti.
- **Eski adresler korunur:** Eski WordPress adreslerinin tümü (`/portfolio/...`, `/portfolyo/`, blog yazıları, `/feed/`) yeni adreslere **301** ile yönlendirilir (`public/.htaccess`, `public/_redirects`).
- **Erişilebilirlik:** Anlamsal HTML, klavyeyle kullanım, “içeriğe geç” bağlantısı, `prefers-reduced-motion` desteği; menü JavaScript kapalıyken de çalışır.
- **Gizlilik (KVKK):** Çerez yok, tarayıcıda veri saklanmaz, izleme yok, gömülü üçüncü taraf içerik yok.
- **Güvenlik başlıkları:** CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.

## Sayfalar

| TR | EN | İçerik |
|---|---|---|
| `/` | `/en/` | 01 Kapak (günün arazisi) · 02 Derinlemesine (beş soru) · 03 Ofis (ölçek, coğrafya, süreklilik, ödüller) · 04 Ölçekler · 05 Kesitler (dizin + kesitler) |
| `/projeler/` | `/en/projects/` | Derinlemesine incelemeler + dizin + kesitler |
| `/projeler/<slug>/` | `/en/projects/<slug>/` | 5 inceleme (bölümler, numaralı şekiller, künye) veya sade “levha” sayfası |
| `/ofis/` | `/en/studio/` | Ofis, çalışma biçimi, çalışma alanları, kurucular, kayıt (ödüller, yayınlar, sergiler) |
| `/gunluk/` | `/en/journal/` | Notlar (eski blogdan 14 yazı) |
| `/iletisim/` | `/en/contact/` | Adres, telefon, e-posta, form |
| `/kvkk/` | `/en/privacy/` | KVKK aydınlatma metni |

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
  data/
    site.ts        Adres, telefon, e-posta, sosyal medya — tek kaynak
    projects.ts    Tüm projeler (TR/EN başlık, özet, metin, künye)
    cases.ts       Beş derinlemesine inceleme: soru, bölümler, şekiller
    monograph.ts   Ölçekler, yerler, dizin grupları
    approach.ts    Yaklaşım: beş ilke (altbilgi ve Ofis sayfası)
    services.ts    Çalışma alanları (Ofis sayfası)
    archive.ts     Dizindeki diğer çalışmalar
    timeline.ts    Ödüller, sergiler, söyleşiler (Ofis → Kayıt)
  content/journal/tr|en/   Notlar (Markdown)
  assets/projects/<slug>/  Proje görselleri (00.webp = kapak)
  views/         Sayfa gövdeleri (TR ve EN ortak)
  pages/         Adresler (TR kök, EN /en/)
  components/    Arazi (Land), sayfa başlığı, şekil, inceleme listesi, ölçekler, kesitler, dizin, logo, KVKK
  lib/geometry.ts      Altın oran, Fibonacci spirali, cephe kompozisyonu, silüet, ağaç
  lib/land.ts          Arazi motoru (zemin altı kesit): eş yükselti çizgileri
  pages/art/           Üretken ağaç çizimleri (SVG)
  scripts/land.ts      Arazinin tarayıcıda çizimi ve yavaş akışı
  layouts/Book.astro   Başlık, altbilgi, SEO
  styles/book.css      Tasarım sistemi (kâğıt / mürekkep)
public/
  .htaccess              Apache: yönlendirmeler, güvenlik, önbellek
  _redirects, _headers   Netlify / Cloudflare Pages karşılıkları
  api/contact.php        İletişim formu işleyicisi
```

### Derinlemesine incelemeyi değiştirmek
`src/data/cases.ts` dosyasında her inceleme bir proje (`slug`), bir soru, bir giriş paragrafı ve bölümlerden oluşur. Bölümlerdeki şekiller, projenin görsel sırasına göre numaralanır (`3` → `src/assets/projects/<slug>/03.webp`); başka bir projenin görseli `"slug:3"` biçiminde kullanılabilir. Şekil düzenleri: `full`, `wide`, `pair`, `grid`, `strip`, `inset`. Düşük çözünürlüklü görseller otomatik olarak daha dar gösterilir.

### Yeni proje eklemek
1. Görselleri `src/assets/projects/<yeni-slug>/` klasörüne `00.webp`, `01.webp`… olarak koyun (`00` kapak). Uzun kenar ~2000 px yeterli.
2. `src/data/projects.ts` dosyasına bir kayıt ekleyin. Proje otomatik olarak dizine, kesitlere ve kendi levha sayfasına eklenir.

### Yeni not eklemek
`src/content/journal/tr/<slug>.md` ve aynı adla `src/content/journal/en/<slug>.md` oluşturun:

```md
---
title: 'Başlık'
description: 'Kısa özet'
date: 2026-11-24
cover: ../../../assets/journal/gorsel.webp   # isteğe bağlı
project: fenix84-antalya                       # isteğe bağlı, ilgili proje
tags: ['Ödül']
---
Metin…
```

## Yayına alma

### Seçenek A — Mevcut hosting (cPanel / Apache + PHP)
1. `npm run build` (ya da GitHub → Actions → son “CI” çalışması → **demirce-site** paketini indirin)
2. `dist/` klasörünün **içeriğini** sunucudaki `public_html/` klasörüne yükleyin. Gizli `.htaccess` dosyasının da yüklendiğinden emin olun.
3. Eski WordPress dosyalarını yedekleyip kaldırın. Eski adresler `.htaccess` ile otomatik yönlendirilir.
4. İletişim formu `api/contact.php` ile çalışır. İçindeki `TO_EMAIL` / `FROM_EMAIL` adreslerini kontrol edin; `FROM_EMAIL` alan adınıza ait olmalıdır (SPF/DMARC).

### Seçenek B — Cloudflare Pages / Netlify / Vercel
Depoyu bağlayın; derleme komutu `npm run build`, çıktı klasörü `dist`, Node sürümü 22. `_redirects` ve `_headers` otomatik uygulanır. PHP çalışmayacağı için `src/data/site.ts` içindeki `formEndpoint` değerini bir form servisine (Formspree, Basin, Netlify Forms vb.) yönlendirin. Form, sunucuya ulaşamazsa ziyaretçinin e-posta uygulamasında hazır bir taslak açar; mesaj kaybolmaz.

GitHub Actions (`.github/workflows/ci.yml`) her gönderimde tip denetimi ve derleme yapar, derlenmiş siteyi indirilebilir bir paket olarak saklar.

### Önizleme — GitHub Pages
Deponun varsayılan dalına her gönderimde site **https://alpaycoin-1977.github.io/DEMIRCE_WEB/** adresinde otomatik yayınlanır (GitHub, Pages yayınına yalnızca varsayılan daldan izin verir) (`.github/workflows/pages.yml`).
- İlk kurulum (bir kez): GitHub → **Settings → Pages → Build and deployment → Source: “GitHub Actions”**. Ardından Actions → “Önizleme (GitHub Pages)” → **Run workflow**.
- Önizleme arama motorlarına kapalıdır (`noindex` + `robots.txt`); canonical adresler www.demirce.com'u gösterir.
- Önizlemede PHP çalışmadığı için iletişim formu ziyaretçinin e-posta uygulamasında taslak açar.
- Yerelde aynı derlemeyi denemek için: `SITE_URL=https://alpaycoin-1977.github.io SITE_BASE=/DEMIRCE_WEB PREVIEW=1 npm run build`

## Yayından önce kontrol edilmesi gerekenler
- [ ] **Yaklaşım metinleri** (`src/data/approach.ts`): beş ilkenin başlıkları ofisin kendi ifadeleri; kısa açıklamaları yeni yazıldı, gözden geçirin.
- [ ] **Kurucular / unvanlar** (`src/views/Office.astro`): eski sitedeki yazılardan derlendi; Alpay Demirci ve Burçin Demirci için unvanları doğrulayın.
- [ ] **İnceleme metinleri ve şekil altyazıları** (`src/data/cases.ts`): eski proje yazılarından genişletildi; bazı tasvirler görsellere bakılarak yazıldı.
- [ ] **Yüksek çözünürlüklü görseller:** özellikle Mezitli görselleri eski sitede düşük çözünürlüklü; ofisteki asıl görseller monografi düzenini çok güçlendirir.
- [ ] **Dizin** (`src/data/archive.ts`) ve **kayıt** (`src/data/timeline.ts`): eski blog kayıtlarından derlendi; yıllar haber tarihleridir.
- [ ] **Eksik künye bilgileri:** eski sitede yer almayan yıl ve konumlar boş bırakıldı (ör. Otel Deco, Otel Lusso, TLP Evi, Borncity).
- [ ] **KVKK metni** (`src/components/PrivacyContent.astro`): şablondur, hukuk danışmanınızla gözden geçirin.
- [ ] **Posta kodu** (`src/data/site.ts` → `postalCode`).
- [ ] **İletişim formu:** yayına aldıktan sonra bir deneme mesajı gönderin.

> Önceki tasarımlar git geçmişinde durur: ilk deneme “Pafta” (3B güneş çalışması, fizibilite aracı) `f33bd9b`, gazete ön sayfalı “Monografi” `b84050e`.
