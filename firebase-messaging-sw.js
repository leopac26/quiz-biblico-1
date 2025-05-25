importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.appspot.com", // <-- Faltando aqui!
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943"
});

const messaging = firebase.messaging();

// Quando receber notificação em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background notification:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
