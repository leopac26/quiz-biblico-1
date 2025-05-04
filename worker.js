/*
const CACHE_NAME = "quiz-biblico-cache-v2";
const urlsToCache = [
  "index.html",
  "quiz.css",
  "quiz.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Instala o cache
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Ativa o novo service worker imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  return self.clients.claim(); // Garante controle imediato da página
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Recebe mensagem da página para ativar o novo worker
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

*/

const CACHE_NAME = "quiz-biblico-cache-v3";
const urlsToCache = [
  "index.html",
  "quiz.css",
  "quiz.js",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Instala o cache
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa e remove caches antigos
self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
