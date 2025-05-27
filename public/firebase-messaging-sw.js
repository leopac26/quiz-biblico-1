// ======== FIREBASE MESSAGING SW ========
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Inicialização do Firebase no service worker
firebase.initializeApp({
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.appspot.com",
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943"
});

const messaging = firebase.messaging();

// ✅ Tratamento de mensagens em segundo plano
messaging.onBackgroundMessage(payload => {
  console.log("[firebase-messaging-sw.js] 📩 Mensagem recebida em segundo plano:", payload);

  // Verifica se há dados de notificação
  if (!payload?.notification) return;

  const { title, body, icon } = payload.notification;

  const notificationOptions = {
    body: body || 'Você recebeu uma nova mensagem.',
    icon: icon || './icon-192.png',
    badge: './badge.png', // opcional, se tiver
    data: {
      url: '/' // pode usar payload.data.url para abrir algo específico
    }
  };

  self.registration.showNotification(title || 'Nova Notificação', notificationOptions);
});

// ✅ Clique na notificação (abre a aba correta)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = new URL('/', self.location.origin).href;

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
