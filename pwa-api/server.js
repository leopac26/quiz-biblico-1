// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminhos para os arquivos de dados
const INSTALLS_FILE = path.join(__dirname, 'installs.json');
const ACCESSES_FILE = path.join(__dirname, 'acessos.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota POST para registrar instalação do app
app.post('/api/registrar-instalacao', (req, res) => {
  const novaInstalacao = {
    timestamp: new Date().toISOString(),
    ...req.body
  };

  let dados = [];
  if (fs.existsSync(INSTALLS_FILE)) {
    const raw = fs.readFileSync(INSTALLS_FILE);
    dados = JSON.parse(raw);
  }

  dados.push(novaInstalacao);
  fs.writeFileSync(INSTALLS_FILE, JSON.stringify(dados, null, 2));

  console.log('Nova instalação registrada:', novaInstalacao);
  res.status(200).json({ mensagem: 'Instalação registrada com sucesso' });
});

// Rota GET para ver instalações
app.get('/api/instalacoes', (req, res) => {
  if (fs.existsSync(INSTALLS_FILE)) {
    const raw = fs.readFileSync(INSTALLS_FILE);
    const dados = JSON.parse(raw);
    res.json(dados);
  } else {
    res.json([]);
  }
});

// Rota POST para registrar acessos ao quiz
app.post('/api/registrar-acesso', (req, res) => {
  const acesso = {
    timestamp: new Date().toISOString(),
    userAgent: req.body.userAgent || req.headers['user-agent']
  };

  let acessos = [];
  if (fs.existsSync(ACCESSES_FILE)) {
    const raw = fs.readFileSync(ACCESSES_FILE);
    acessos = JSON.parse(raw);
  }

  acessos.push(acesso);
  fs.writeFileSync(ACCESSES_FILE, JSON.stringify(acessos, null, 2));

  console.log('Acesso registrado:', acesso);
  res.json({ sucesso: true });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
