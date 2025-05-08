// server.js
const express = require('express');
const fs = require('fs');
const fsPromises = fs.promises;
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const INSTALLS_FILE = path.join(__dirname, 'installs.json');
const ACCESSES_FILE = path.join(__dirname, 'acessos.json');

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// POST - Registrar instalação
app.post('/api/registrar-instalacao', async (req, res) => {
  try {
    const novaInstalacao = {
      timestamp: new Date().toISOString(),
      ...req.body
    };

    let dados = [];
    if (fs.existsSync(INSTALLS_FILE)) {
      const raw = await fsPromises.readFile(INSTALLS_FILE, 'utf-8');
      dados = JSON.parse(raw);
    }

    dados.push(novaInstalacao);
    await fsPromises.writeFile(INSTALLS_FILE, JSON.stringify(dados, null, 2));

    console.log('Nova instalação registrada:', novaInstalacao);
    res.status(200).json({ mensagem: 'Instalação registrada com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar instalação:', err);
    res.status(500).json({ erro: 'Erro ao registrar instalação' });
  }
});

// GET - Ver instalações
app.get('/api/instalacoes', async (req, res) => {
  try {
    if (fs.existsSync(INSTALLS_FILE)) {
      const raw = await fsPromises.readFile(INSTALLS_FILE, 'utf-8');
      const dados = JSON.parse(raw);
      res.json(dados);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error('Erro ao ler instalações:', err);
    res.status(500).json({ erro: 'Erro ao buscar instalações' });
  }
});

// POST - Registrar acesso ao quiz
app.post('/api/registrar-acesso', async (req, res) => {
  try {
    const acesso = {
      timestamp: new Date().toISOString(),
      userAgent: req.body.userAgent || req.headers['user-agent']
    };

    let acessos = [];
    if (fs.existsSync(ACCESSES_FILE)) {
      const raw = await fsPromises.readFile(ACCESSES_FILE, 'utf-8');
      acessos = JSON.parse(raw);
    }

    acessos.push(acesso);
    await fsPromises.writeFile(ACCESSES_FILE, JSON.stringify(acessos, null, 2));

    console.log('Acesso registrado:', acesso);
    res.json({ sucesso: true });
  } catch (err) {
    console.error('Erro ao registrar acesso:', err);
    res.status(500).json({ erro: 'Erro ao registrar acesso' });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Tratamento de erros não tratados
process.on('uncaughtException', err => {
  console.error('Erro não tratado:', err);
});

process.on('SIGTERM', () => {
  console.log('Recebido SIGTERM, finalizando servidor...');
  process.exit(0);
});
