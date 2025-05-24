const CACHE_NAME = 'quiz-biblico-cache-v7'; // Altere a versão toda vez que houver atualização
const urlsToCache = [
  './index.html',
  './quiz.js',
  './quiz.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Durante a instalação do Service Worker, os arquivos são cacheados
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Ativa a nova versão do SW imediatamente
});

// Durante a ativação do Service Worker, limpa os caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Faz o SW controlar todas as abas abertas
});

// Durante o fetch, responde com o cache ou faz a requisição
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('./index.html'); // Fallback
    })
  );
});
