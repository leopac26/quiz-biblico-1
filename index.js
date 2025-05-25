
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const message = {
  token: '<SEU_TOKEN_FCM_AQUI>', // substitua pelo seu token
  notification: {
    title: 'Notificação de Teste',
    body: 'Esta é uma notificação enviada localmente via Node.js usando FCM!'
  }
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Mensagem enviada com sucesso:', response);
  })
  .catch((error) => {
    console.error('Erro ao enviar mensagem:', error);
  });
