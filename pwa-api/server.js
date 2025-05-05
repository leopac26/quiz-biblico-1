const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = '/tmp/installs.json'; // <-- USAR /tmp no Railway

app.use(cors());
app.use(express.json());

app.post('/api/registrar-instalacao', (req, res) => {
  const novaInstalacao = {
    timestamp: new Date().toISOString(),
    ...req.body
  };

  let dados = [];
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE);
    dados = JSON.parse(raw);
  }

  dados.push(novaInstalacao);
  fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));

  console.log('Nova instalação registrada:', novaInstalacao);
  res.status(200).json({ mensagem: 'Instalação registrada com sucesso' });
});

app.get('/api/instalacoes', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE);
    const dados = JSON.parse(raw);
    res.json(dados);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
