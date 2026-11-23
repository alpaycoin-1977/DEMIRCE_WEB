/**
 * Service worker — çevrimdışı destek.
 * HTML: önce ağ, sonra önbellek (çevrimdışıysa /offline/).
 * /_astro/ varlıkları (sürüm karmalı): önce önbellek.
 */
import type { APIRoute } from 'astro';

const VERSION = `demirce-${Date.now().toString(36)}`;

const sw = `
const CACHE = '${VERSION}';
const CORE = ['/', '/en/', '/offline/', '/favicon.svg', '/manifest.webmanifest'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/offline/')))
    );
    return;
  }
  if (url.pathname.startsWith('/_astro/') || /\\.(woff2|webp|avif|jpg|png|svg)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
`;

export const GET: APIRoute = () => new Response(sw, { headers: { 'Content-Type': 'application/javascript' } });
