/**
 * Ofis bilgileri — tüm sitede tek kaynaktan kullanılır.
 * Adres / telefon / e-posta değişirse yalnızca bu dosyayı güncelleyin.
 */
export const SITE = {
  name: 'DEMİRCE Mimarlık',
  shortName: 'DEMİRCE',
  legalName: 'DEMİRCE Mimarlık',
  alternateName: 'DEMIRCE NORMS at Architecture & Interiors',
  url: 'https://www.demirce.com',
  founded: 1999,
  email: 'info@demirce.com',
  phone: '+90 850 441 46 69',
  phoneHref: 'tel:+908504414669',
  address: {
    street: 'Kültür Mahallesi, Cumhuriyet Bulvarı No: 133/3',
    district: 'Alsancak, Konak',
    city: 'İzmir',
    postalCode: '35220',
    country: 'TR',
    countryName: { tr: 'Türkiye', en: 'Türkiye' },
  },
  /** Alsancak ofisi — güneş çalışması ve haritada kullanılır */
  geo: { lat: 38.4335, lon: 27.1428 },
  /** İzmir saat dilimi: UTC+3 (Europe/Istanbul, yaz saati uygulaması yok) */
  utcOffset: 3,
  social: {
    instagram: 'https://www.instagram.com/demirce_norms/',
    linkedin: 'https://tr.linkedin.com/company/demirce-mimarl%C4%B1k',
    facebook: 'https://www.facebook.com/demirce.architects',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=K%C3%BClt%C3%BCr+Mahallesi+Cumhuriyet+Bulvar%C4%B1+No%3A133%2F3+Alsancak+%C4%B0zmir',
  /**
   * İletişim formunun POST adresi. PHP destekli sunucuda (ör. cPanel)
   * public/api/contact.php çalışır. Başka bir servis (Formspree vb.)
   * kullanılacaksa adresi burada değiştirin. Gönderim başarısız olursa
   * form otomatik olarak e-posta istemcisini (mailto) açar.
   */
  formEndpoint: '/api/contact.php',
} as const;
