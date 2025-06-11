// ======== CACHE ========
const CACHE_NAME = 'quiz-biblico-cache-v7';
const urlsToCache = [
  './index.html',
  './quiz.js',
  './quiz.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
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
    ).catch(() => caches.match('./index.html'))
  );
});

// ======== FCM (Firebase Cloud Messaging) ========
// 🚨 IMPORTANTE: Você precisa adaptar a URL do Firebase conforme a versão

importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// 🔐 SUA CONFIG DO FIREBASE AQUI:
firebase.initializeApp({
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.appspot.com", // corrigido
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943",
  measurementId: "SEU_MEASUREMENT_ID"
});

const messaging = firebase.messaging();

// Opcional: escutar notificações recebidas em segundo plano
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
