const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const admin = require("firebase-admin");

const app = express();
const prisma = new PrismaClient();

// 🔐 Inicializa o Firebase Admin
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());
app.use(express.json());

// ✅ Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ SPA fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// 🔁 ROTAS DE PROGRESSO (complementar)
app.post("/progresso", async (req, res) => {
  const { usuario, fase1, fase2, fase3, total } = req.body;
  
  // Adicionar um log para verificar os dados recebidos
  console.log("Dados recebidos:", { usuario, fase1, fase2, fase3, total });

  try {
    await prisma.progresso.upsert({
      where: { usuario },
      update: { fase1, fase2, fase3, total },
      create: { usuario, fase1, fase2, fase3, total },
    });

    res.status(200).json({ message: "Progresso salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ error: "Erro interno ao salvar progresso." });
  }
});

app.get("/progresso", async (req, res) => {
  try {
    const dados = await prisma.progresso.findMany();
    res.json(dados);
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);
    res.status(500).json({ error: "Erro interno ao buscar progresso." });
  }
});

app.get("/relatorio", async (req, res) => {
  try {
    const dados = await prisma.progresso.findMany({
      orderBy: { total: "desc" },
    });
    res.json(dados);
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    res.status(500).json({ error: "Erro ao gerar relatório." });
  }
});


// 🔁 ROTAS DE PUSH NOTIFICATIONS (Firebase)
app.post("/api/salvar-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token não fornecido" });
  }

  try {
    await prisma.token.upsert({
      where: { token },
      update: {},
      create: { token },
    });

    console.log("✅ Token FCM salvo:", token);
    res.status(200).json({ message: "Token salvo com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao salvar token:", err);
    res.status(500).json({ error: "Erro ao salvar token." });
  }
});

app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res
      .status(400)
      .json({ error: "Campos token, title e body são obrigatórios." });
  }

  const message = {
    token,
    notification: { title, body },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notificação enviada:", response);
    res.json({ success: true, response });
  } catch (error) {
    console.error("❌ Erro ao enviar notificação:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// ✅ Rota de teste
app.get("/ping", (req, res) => {
  res.send("✅ API online!");
});


// 🚀 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
