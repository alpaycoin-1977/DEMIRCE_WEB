<?php
/**
 * DEMİRCE — İletişim formu işleyicisi (PHP 7.4+)
 * ------------------------------------------------------------
 * PHP destekli paylaşımlı hostingte (cPanel vb.) ek kurulum gerektirmez.
 * Sunucunuzun mail() fonksiyonu çalışmıyorsa SMTP için PHPMailer
 * kullanmanız ya da src/data/site.ts içindeki formEndpoint adresini bir
 * form servisine (Formspree, Basin vb.) yönlendirmeniz gerekir.
 * İstemci tarafı, gönderim başarısız olursa e-posta taslağı (mailto) açar.
 */

declare(strict_types=1);

// ---- Ayarlar --------------------------------------------------------------
const TO_EMAIL   = 'info@demirce.com';
const FROM_EMAIL = 'noreply@demirce.com';   // alan adınıza ait bir adres olmalı (SPF/DMARC)
const SITE_HOST  = 'www.demirce.com';
const RATE_LIMIT_SECONDS = 30;              // aynı IP'den iki gönderim arası en az süre
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Yalnızca kendi sitemizden gelen istekler
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = parse_url($origin, PHP_URL_HOST) ?: '';
    if (!in_array($host, [SITE_HOST, 'demirce.com', $_SERVER['HTTP_HOST'] ?? ''], true)) {
        respond(403, ['ok' => false, 'error' => 'origin']);
    }
}

// Bot tuzağı (honeypot): doluysa sessizce "başarılı" dön
if (!empty($_POST['website'])) {
    respond(200, ['ok' => true]);
}

// Basit hız sınırı
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'x') . __FILE__);
$stamp  = sys_get_temp_dir() . '/demirce_form_' . $ipHash;
if (is_file($stamp) && (time() - (int) @filemtime($stamp)) < RATE_LIMIT_SECONDS) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}

function field(string $key, int $max): string {
    $v = trim((string) ($_POST[$key] ?? ''));
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    return mb_substr($v, 0, $max);
}
function oneLine(string $v): string {
    // Başlık enjeksiyonunu engelle
    return trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? '');
}

$name    = oneLine(field('name', 120));
$email   = oneLine(field('email', 160));
$phone   = oneLine(field('phone', 40));
$subject = oneLine(field('subject', 120));
$message = field('message', 6000);
$board   = oneLine(field('board', 2000));
$lang    = field('lang', 2) === 'en' ? 'en' : 'tr';
$consent = !empty($_POST['consent']);

if ($name === '' || $message === '' || mb_strlen($message) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent) {
    respond(422, ['ok' => false, 'error' => 'validation']);
}
if ($board !== '' && !preg_match('#^https?://#', $board)) {
    $board = '';
}

$body  = "Yeni mesaj — www.demirce.com\n";
$body .= str_repeat('-', 40) . "\n";
$body .= "Ad Soyad : {$name}\n";
$body .= "E-posta  : {$email}\n";
if ($phone !== '') $body .= "Telefon  : {$phone}\n";
$body .= "Konu     : {$subject}\n";
$body .= "Dil      : {$lang}\n";
if ($board !== '') $body .= "Pano     : {$board}\n";
$body .= str_repeat('-', 40) . "\n\n{$message}\n\n";
$body .= str_repeat('-', 40) . "\nKVKK aydınlatma metni onaylandı: evet\n";
$body .= 'Tarih: ' . date('Y-m-d H:i:s') . "\n";

$subjectLine = '=?UTF-8?B?' . base64_encode("[demirce.com] {$subject} — {$name}") . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: DEMİRCE Web <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'X-Mailer: demirce-web',
];

$sent = @mail(TO_EMAIL, $subjectLine, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);
if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'mail']);
}
@touch($stamp);
respond(200, ['ok' => true]);
