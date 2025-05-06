/*const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const INSTALLS_FILE = '/tmp/installs.json';
const ACCESSES_FILE = '/tmp/acessos.json';

app.use(cors());
app.use(express.json());

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
app.use(express.static('public'));

// Página HTML para visualizar os acessos
app.get('/quiz-Biblico/acessos.html', (req, res) => {
  let acessos = [];

  if (fs.existsSync(ACCESSES_FILE)) {
    const raw = fs.readFileSync(ACCESSES_FILE);
    acessos = JSON.parse(raw);
  }

  let html = `
    <html>
      <head>
        <title>Acessos ao Quiz</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f2f2f2; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { background: white; margin: 5px 0; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Acessos Registrados</h1>
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
*/

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
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

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

// Página HTML para visualizar os acessos
app.get('/quiz-Biblico/acessos.html', (req, res) => {
  let acessos = [];

  if (fs.existsSync(ACCESSES_FILE)) {
    const raw = fs.readFileSync(ACCESSES_FILE);
    acessos = JSON.parse(raw);
  }

  let html = `
    <html>
      <head>
        <title>Acessos ao Quiz</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f2f2f2; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { background: white; margin: 5px 0; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Acessos Registrados</h1>
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
