const express = require("express");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ ROTA: Salva ou atualiza o progresso do usuário
app.post("/progresso", async (req, res) => {
  const { usuario, fase1, fase2, fase3 } = req.body;

  if (!usuario) {
    return res.status(400).json({ erro: "Campo 'usuario' é obrigatório." });
  }

  const total = (fase1 || 0) + (fase2 || 0) + (fase3 || 0);

  try {
    const progresso = await prisma.progresso.upsert({
      where: { usuario },
      update: { fase1, fase2, fase3, total },
      create: { usuario, fase1, fase2, fase3, total }
    });

    res.json({ mensagem: "✅ Progresso salvo com sucesso", progresso });
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
    res.status(500).json({ erro: "Erro ao salvar progresso." });
  }
});

// ✅ ROTA: Consulta o progresso de um usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;

  if (!usuario) {
    return res.status(400).json({ erro: "Campo 'usuario' é obrigatório." });
  }

  try {
    const progresso = await prisma.progresso.findUnique({
  where: { usuario: req.query.usuario }
});


    if (!progresso) {
      return res.status(404).json({ mensagem: "Progresso não encontrado." });
    }

    res.json(progresso);
  } catch (err) {
    console.error("Erro ao consultar progresso:", err);
    res.status(500).json({ erro: "Erro ao consultar progresso." });
  }
});

// ✅ ROTA: Retorna todos os registros de progresso ordenados por total
app.get("/relatorio", async (req, res) => {
  try {
    const relatorio = await prisma.progresso.findMany({
      orderBy: { total: "desc" }
    });

    res.json(relatorio);
  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ erro: "Erro ao gerar relatório." });
  }
});

// ✅ ROTA: Salva token FCM
app.post("/api/salvar-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ erro: "Token FCM ausente." });
  }

  try {
    const tokenSalvo = await prisma.token.upsert({
      where: { token },
      update: {},
      create: { token }
    });

    res.json({ mensagem: "✅ Token salvo com sucesso", tokenSalvo });
  } catch (err) {
    console.error("Erro ao salvar token:", err);
    res.status(500).json({ erro: "Erro ao salvar token." });
  }
});

// ✅ ROTA de teste
app.get("/ping", (req, res) => {
  res.send("✅ API online!");
});

// 🚀 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
