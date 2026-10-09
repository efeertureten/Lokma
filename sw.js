/* Lokma service worker: opens offline, updates itself on the next launch. Never touches Gemini API calls. */
const VERSION = 'lokma-v1';
const FONTS = 'lokma-fonts';
const SHELL = ['./', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

// Safari refuses redirected responses for navigations, so store a clean copy.
async function clean(res) {
  if (!res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    for (const url of SHELL) {
      try { const res = await fetch(url, { cache: 'reload' }); if (res.ok) await cache.put(url, await clean(res)); } catch (e) { /* offline install: fill later */ }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function networkFirstPage(req) {
  const cache = await caches.open(VERSION);
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, reject) => setTimeout(() => reject(new Error('slow')), 4000))
    ]);
    if (res.ok) { const copy = await clean(res.clone()); await cache.put('./', copy); }
    return res;
  } catch (e) {
    return (await cache.match('./')) || (await cache.match(req)) || new Response('Lokma çevrimdışı ve henüz önbelleğe alınmadı. İnternete bağlanıp tekrar aç.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, await clean(res.clone()));
  return res;
}

async function fontsSWR(req) {
  const cache = await caches.open(FONTS);
  const hit = await cache.match(req);
  const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { event.respondWith(fontsSWR(req)); return; }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') { event.respondWith(networkFirstPage(req)); return; }
  event.respondWith(cacheFirst(req));
});
