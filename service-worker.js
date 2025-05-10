
const CACHE_NAME = "quiz-biblico-cache-v4";
const urlsToCache = [
  "index.html",
  "quiz.css",
  "quiz.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Faz o novo service worker assumir imediatamente
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          return caches.delete(cacheName); // Deleta caches antigos
        })
      );
    })
  );
});

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification('Nova Atualização!', options)
  );
});
