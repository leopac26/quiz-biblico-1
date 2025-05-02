const CACHE_NAME = "quiz-biblico-cache-v1";
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
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
