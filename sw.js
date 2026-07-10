// Service Worker for GlobeSweeper PWA
const CACHE_NAME = 'globesweeper-v1.1.02';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'public/192.png',
  'public/512.png',
  'low_poly_golf_flag_animated/scene.gltf',
  'low_poly_golf_flag_animated/scene.bin',
  'low_poly_golf_flag_animated/license.txt',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Opened cache:', CACHE_NAME);
        // Cache core files, but don't fail if some are missing
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn('[SW] Failed to cache:', url, err);
            })
          )
        );
      })
      .catch((error) => {
        console.error('[SW] Cache install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  
  // For same-origin requests, use cache-first strategy
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('index.html').then((indexResponse) => {
                return indexResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
              });
            }
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
    );
  } else {
    // For CDN resources (Three.js, etc.), use network-first strategy
    // This allows the app to work offline but prefers fresh CDN resources when online
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses from CDN
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache, or fallback to Service Unavailable
          return caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
        })
    );
  }
});

// Message event - skip waiting on request
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

