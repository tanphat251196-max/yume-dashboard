const CACHE_NAME = 'yume-dashboard-v3';
const ASSETS = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// Install: cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: HTML + status.json luôn network first, icons dùng cache
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // HTML và status.json: luôn lấy mới nhất từ network
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname.endsWith('status.json') || url.pathname.endsWith('cron-history.json') || url.pathname.endsWith('equity-history.json')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' }).catch(() => caches.match(e.request))
    );
    return;
  }
  // Icons/manifest: cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
