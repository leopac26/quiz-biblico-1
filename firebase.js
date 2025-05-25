// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYbGBfVw3Bni1O0JAzT1iClSF_9MZfISs",
  authDomain: "quiz-biblico-a64f5.firebaseapp.com",
  projectId: "quiz-biblico-a64f5",
  storageBucket: "quiz-biblico-a64f5.appspot.com", // corrigido
  messagingSenderId: "633779368186",
  appId: "1:633779368186:web:10f8cb84de792ad82c1943"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
