const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Serve arquivos estáticos da pasta "public" (inclusive firebase-messaging-sw.js)
app.use(express.static(path.join(__dirname, "public")));

// ✅ (opcional) Serve index.html de forma amigável para SPA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔁 Suas rotas API (sem alterações)
app.post("/progresso", async (req, res) => {
  // ...
});

app.get("/progresso", async (req, res) => {
  // ...
});

app.get("/relatorio", async (req, res) => {
  // ...
});

app.post("/api/salvar-token", async (req, res) => {
  // ...
});

app.get("/ping", (req, res) => {
  res.send("✅ API online!");
});

// 🚀 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
