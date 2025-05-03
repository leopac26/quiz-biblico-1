// index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota para registrar que alguém jogou
app.post('/registro', (req, res) => {
  const { usuario, acao } = req.body;
  console.log(`[${new Date().toISOString()}] ${usuario} fez: ${acao}`);
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
