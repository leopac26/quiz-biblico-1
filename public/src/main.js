import { messaging, getToken, onMessage } from './firebase.js';

const VAPID_KEY = '*';
const API_URL = '*';

async function initFCM() {
  if (!('serviceWorker' in navigator)) {
    console.warn("⚠️ Este navegador não suporta service workers.");
    return;
  }

  try {
    // ✅ Registra o Service Worker (APENAS AQUI)
    const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
    console.log('✅ Service Worker registrado:', registration);

    // ✅ Aguarda o Service Worker estar ativo
    await navigator.serviceWorker.ready;
    console.log("✅ Service Worker pronto");

    // ✅ Solicita permissão para notificações
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("🚫 Permissão de notificação negada.");
      return;
    }

    console.log("🔔 Permissão concedida");

    // ✅ Obtém o token FCM
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    if (!currentToken) {
      console.warn("⚠️ Nenhum token FCM disponível.");
      return;
    }

    console.log("📲 Token de notificação:", currentToken);

    // ✅ Envia token para o backend
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: currentToken })
    });

    // Verificação de sucesso da requisição
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    // Obtém a resposta do servidor
    const data = await response.json();
    console.log("✅ Token salvo no backend:", data);

    // ✅ Escuta notificações em primeiro plano
    onMessage(messaging, (payload) => {
      console.log("📩 Notificação recebida em primeiro plano:", payload);
      alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
    });

  } catch (err) {
    console.error("❌ Erro ao configurar notificações:", err);
  }
}

// ✅ Executa ao carregar a página
window.addEventListener('load', () => {
  initFCM();
});
