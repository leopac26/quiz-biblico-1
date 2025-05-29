const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const admin = require("firebase-admin");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// === ROTAS ===

// ✅ Salva ou atualiza o progresso
app.post("/progresso", async (req, res) => {
  const { usuario, fase1, fase2, fase3 } = req.body;
  if (!usuario) return res.status(400).json({ erro: "Campo 'usuario' é obrigatório." });

  const total = (fase1 || 0) + (fase2 || 0) + (fase3 || 0);

  try {
    const progresso = await prisma.Progresso.upsert({
      where: { usuario },
      update: { fase1, fase2, fase3, total },
      create: { usuario, fase1, fase2, fase3, total },
    });
    res.json({ mensagem: "✅ Progresso salvo com sucesso", progresso });
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
    res.status(500).json({ erro: "Erro ao salvar progresso." });
  }
});

// ✅ Consulta o progresso
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;
  if (!usuario) return res.status(400).json({ erro: "Campo 'usuario' é obrigatório." });

  try {
    const progresso = await prisma.Progresso.findUnique({ where: { usuario } });
    if (!progresso) return res.status(404).json({ mensagem: "Progresso não encontrado." });

    res.json(progresso);
  } catch (err) {
    console.error("Erro ao consultar progresso:", err);
    res.status(500).json({ erro: "Erro ao consultar progresso." });
  }
});

// ✅ Relatório geral
app.get("/relatorio", async (req, res) => {
  try {
    const relatorio = await prisma.Progresso.findMany({ orderBy: { total: "desc" } });
    res.json(relatorio);
  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ erro: "Erro ao gerar relatório." });
  }
});

// ✅ Salva token FCM
app.post("/api/salvar-token", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ erro: "Token FCM ausente." });

  try {
    const tokenSalvo = await prisma.Token.upsert({
      where: { token },
      update: {},
      create: { token },
    });
    res.json({ mensagem: "✅ Token salvo com sucesso", tokenSalvo });
  } catch (err) {
    console.error("Erro ao salvar token:", err);
    res.status(500).json({ erro: "Erro ao salvar token." });
  }
});

// ✅ Envia notificação
app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;
  if (!token || !title || !body) {
    return res.status(400).json({ error: "Campos token, title e body são obrigatórios." });
  }

  const message = {
    token,
    notification: { title, body },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Mensagem enviada com sucesso:", response);
    res.json({ success: true, response });
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Rota de teste
app.get("/ping", (req, res) => {
  res.send("✅ API online!");
});

// 🚀 Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
