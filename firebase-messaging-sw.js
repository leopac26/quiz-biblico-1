// === CACHE STATIC FILES ===
const CACHE_NAME = 'quiz-biblico-cache-v7';
const urlsToCache = [
  '/QUIZ-BIBLICO/index.html',
  '/QUIZ-BIBLICO/quiz.js',
  '/QUIZ-BIBLICO/quiz.css',
  '/QUIZ-BIBLICO/manifest.json',
  '/QUIZ-BIBLICO/icon-192.png',
  '/QUIZ-BIBLICO/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    ).catch(() => caches.match('/QUIZ-BIBLICO/index.html'))
  );
});

// === FIREBASE MESSAGING (FCM) ===
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.appspot.com",
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] 📩 Mensagem recebida em segundo plano:', payload);

  if (!payload?.notification) return;

  const { title, body, icon } = payload.notification;

  const notificationOptions = {
    body: body || 'Você recebeu uma nova mensagem.',
    icon: icon || '/QUIZ-BIBLICO/icon-192.png',
    data: { url: '/QUIZ-BIBLICO/' }
  };

  self.registration.showNotification(title || 'Nova Notificação', notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = new URL('/QUIZ-BIBLICO/', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
