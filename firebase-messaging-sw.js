// Importa os scripts compatíveis do Firebase
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Inicializa o Firebase no contexto do Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.firebasestorage.app",
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943"
});

// Inicializa o Firebase Messaging
const messaging = firebase.messaging();

// Manipula mensagens recebidas em background
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em segundo plano:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png' // Atualize esse caminho com seu ícone
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
