import { messaging, getToken, onMessage } from './firebase.js';

const VAPID_KEY = 'BPOzzcywntpWNHyCN2gpYNQeUt2tNkhn_VlaecJ0T6Krb5yBlqkbxwL7dtxe5Ne937c8nNYWNoWLrytXpvsUMg4';
const API_URL = 'https://quizbiblico-production.up.railway.app/api/salvar-token';

async function initFCM() {
  if (!('serviceWorker' in navigator)) {
    console.warn("⚠️ Este navegador não suporta service workers.");
    return;
  }

  try {
    // ✅ Registra o Service Worker
    const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js');
    console.log('✅ Service Worker registrado:', registration);

    // ✅ Aguarda o Service Worker estar controlando a página
    await navigator.serviceWorker.ready;
    console.log("✅ Service Worker pronto");

    // ✅ Solicita permissão de notificação
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🚫 Permissão de notificação negada.");
      return;
    }

    console.log("🔔 Permissão concedida");

    // ✅ Obtém o token do FCM
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (!currentToken) {
      console.warn("⚠️ Nenhum token FCM disponível.");
      return;
    }

    console.log("📲 Token de notificação:", currentToken);

    // ✅ Envia o token ao backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: currentToken })
    });

    if (!response.ok) {
      const texto = await response.text();
      throw new Error(`Erro ${response.status}: ${texto}`);
    }

    const data = await response.json();
    console.log("✅ Token salvo no backend:", data);

    // ✅ Lida com notificações recebidas em primeiro plano
    onMessage(messaging, (payload) => {
      console.log("📩 Notificação recebida em primeiro plano:", payload);
      alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
    });

  } catch (err) {
    console.error("❌ Erro ao configurar notificações:", err);
  }
}

window.addEventListener('load', () => {
  initFCM(); // Garante que só roda quando a página estiver carregada
});
