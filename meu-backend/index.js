// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/registrar-acesso', (req, res) => {
  const { usuario } = req.body;
  console.log('Usuário acessou:', usuario);
  res.status(200).json({ sucesso: true });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
