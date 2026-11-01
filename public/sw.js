// The shell from the network first (4 s), the copy kept when the signal is weak or gone. Supabase and the CDN are never cached here.
const VERSION = '2026.11.01-3';
const CACHE = 'mech-' + VERSION;
const SHELL = ['./', 'app.js', 'theme.js', 'config.js', 'print.js', 'manifest.webmanifest', 'logo.png', 'mark.svg', 'icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.endsWith('version.json')) return;
  const key = url.pathname.endsWith('/index.html') ? url.pathname.replace(/index\.html$/, '') : url.origin + url.pathname;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const net = fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok && !r.redirected) cache.put(key, r.clone()); return r; });
    const kept = await cache.match(key);
    if (!kept) return net.catch(() => cache.match('./'));
    return Promise.race([net.catch(() => kept), new Promise(r => setTimeout(() => r(kept), 4000))]);
  })());
});
