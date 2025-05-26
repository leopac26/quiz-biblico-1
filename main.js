// main.js
import { messaging, getToken, onMessage } from './firebase.js';

const VAPID_KEY = 'BPOzzcywntpWNHyCN2gpYNQeUt2tNkhn_VlaecJ0T6Krb5yBlqkbxwL7dtxe5Ne937c8nNYWNoWLrytXpvsUMg4';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registrado com sucesso');

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("🔔 Permissão concedida");

          getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
          })
            .then((currentToken) => {
              if (currentToken) {
                console.log("📲 Token de notificação:", currentToken);
                // Envie esse token para o backend se desejar
              } else {
                console.log("⚠️ Nenhum token disponível.");
              }
            })
            .catch((err) => {
              console.error("❌ Erro ao obter token:", err);
            });

        } else {
          console.warn("🚫 Permissão de notificação negada.");
        }
      });
    })
    .catch((err) => {
      console.error("❌ Erro ao registrar Service Worker:", err);
    });

  // Escuta notificações em primeiro plano
  onMessage(messaging, (payload) => {
    console.log("📩 Notificação recebida em primeiro plano:", payload);
    alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
  });
}
