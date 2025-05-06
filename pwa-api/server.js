// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const INSTALLS_FILE = '/tmp/installs.json';
const ACCESSES_FILE = '/tmp/acessos.json';

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve HTML, CSS, etc. da pasta "public"

// Rota POST para registrar instalação
app.post('/api/registrar-instalacao', (req, res) => {
  const novaInstalacao = {
    timestamp: new Date().toISOString(),
    ...req.body
  };

  let dados = [];
  if (fs.existsSync(INSTALLS_FILE)) {
    dados = JSON.parse(fs.readFileSync(INSTALLS_FILE));
  }

  dados.push(novaInstalacao);
  fs.writeFileSync(INSTALLS_FILE, JSON.stringify(dados, null, 2));
  console.log('Instalação registrada:', novaInstalacao);
  res.status(200).json({ mensagem: 'Instalação registrada com sucesso' });
});

// Rota GET para ver instalações
app.get('/api/instalacoes', (req, res) => {
  if (fs.existsSync(INSTALLS_FILE)) {
    const dados = JSON.parse(fs.readFileSync(INSTALLS_FILE));
    res.json(dados);
  } else {
    res.json([]);
  }
});

// Rota POST para registrar acessos
app.post('/api/registrar-acesso', (req, res) => {
  const acesso = {
    timestamp: new Date().toISOString(),
    userAgent: req.body.userAgent || req.headers['user-agent']
  };

  let acessos = [];
  if (fs.existsSync(ACCESSES_FILE)) {
    acessos = JSON.parse(fs.readFileSync(ACCESSES_FILE));
  }

  acessos.push(acesso);
  fs.writeFileSync(ACCESSES_FILE, JSON.stringify(acessos, null, 2));
  console.log('Acesso registrado:', acesso);
  res.json({ sucesso: true });
});

// Página para visualizar acessos
app.get('/acessos.html', (req, res) => {
  let acessos = [];
  if (fs.existsSync(ACCESSES_FILE)) {
    acessos = JSON.parse(fs.readFileSync(ACCESSES_FILE));
  }

  let html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Acessos ao Quiz</title>
        <style>
          body { font-family: Arial; padding: 20px; background: #f0f0f0; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { background: #fff; margin: 5px 0; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Acessos ao Quiz</h1>
        <ul>
          ${acessos.map(a => `<li><strong>${a.timestamp}</strong><br>${a.userAgent}</li>`).join('')}
        </ul>
      </body>
    </html>
  `;
  res.send(html);
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
