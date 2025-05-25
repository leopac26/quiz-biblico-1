// main.js
import { messaging, getToken, onMessage } from './firebase.js';

const VAPID_KEY = 'BPOzzcywntpWNHyCN2gpYNQeUt2tNkhn_VlaecJ0T6Krb5yBlqkbxwL7dtxe5Ne937c8nNYWNoWLrytXpvsUMg4';

// Solicita permissão para notificações
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("🔔 Permissão concedida");

    getToken(messaging, { vapidKey: VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log("📲 Token de notificação:", currentToken);
          // Você pode enviar esse token para seu backend ou usar no Firebase Console
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

// Notificação recebida em primeiro plano
onMessage(messaging, (payload) => {
  console.log("📩 Notificação recebida em primeiro plano:", payload);
  alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
});
