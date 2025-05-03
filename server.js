const express = require('express');
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const app = express();// Permitir todas as origens (modo desenvolvimento)
app.use(cors());

// ou de forma mais restrita:
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Seus endpoints
app.post('/api/registrar-acesso', (req, res) => {
  // lógica da API
  res.json({ sucesso: true });
});



// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rota de API
app.post('/api/registrar-acesso', (req, res) => {
  const { timestamp, userAgent } = req.body;
  console.log("📝 Acesso:", timestamp, userAgent);
  res.json({ status: "registrado" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



