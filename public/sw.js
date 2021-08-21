const CACHE_NAME = 'otimigas-app';
const QUEUE_NAME = 'bgSyncQueue';

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  '/static/js/0.chunk.js',
  '/favicon.ico',
  '/css?family=Poppins',
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
  QUEUE_NAME,
  {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  }
);

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE_NAME,
    plugins: [bgSyncPlugin],
  })
);
