// index.js
const express = require('express');
const admin = require('firebase-admin');
const path = require('path'); // segurança no path do JSON

// Inicializa o Firebase Admin com o service account
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

// 🚀 NOVO: Rota para salvar token do FCM
app.post('/api/salvar-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  // Aqui você pode salvar o token no banco, arquivo, etc.
  console.log('✅ Token FCM recebido:', token);

  res.status(200).json({ message: 'Token salvo com sucesso!' });
});

// 📤 Rota para enviar notificação
app.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Campos token, title e body são obrigatórios.' });
  }

  const message = {
    token: token,
    notification: {
      title: title,
      body: body
    }
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Mensagem enviada com sucesso:', response);
    res.json({ success: true, response });
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
