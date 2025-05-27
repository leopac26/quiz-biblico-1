const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para salvar ou atualizar progresso
app.post("/progresso", async (req, res) => {
  console.log("📥 Dados recebidos no POST /progresso:", req.body);

  let { usuario, fase1, fase2, fase3 } = req.body;

  if (!usuario || typeof usuario !== "string" || !usuario.trim()) {
    console.warn("⚠️ Nome de usuário inválido:", usuario);
    return res.status(400).json({ mensagem: "Nome de usuário inválido." });
  }

  usuario = usuario.trim().toLowerCase();
  console.log("🔎 Usuário padronizado:", usuario);

  // Converte para número se for válido
  fase1 = fase1 !== undefined ? Number(fase1) : undefined;
  fase2 = fase2 !== undefined ? Number(fase2) : undefined;
  fase3 = fase3 !== undefined ? Number(fase3) : undefined;

  console.log("🔢 Valores convertidos:", { fase1, fase2, fase3 });

  const algumaFaseValida = [fase1, fase2, fase3].some(
    val => typeof val === "number" && !isNaN(val)
  );

  if (!algumaFaseValida) {
    console.warn("⚠️ Nenhuma fase válida enviada.");
    return res.status(400).json({ mensagem: "Nenhuma fase válida foi enviada." });
  }

  try {
    const dadosExistentes = await prisma.progresso.findUnique({
      where: { usuario },
    });

    console.log("📄 Dados existentes no banco:", dadosExistentes);

    const novosDados = {
      fase1: !isNaN(fase1) ? fase1 : dadosExistentes?.fase1 ?? 0,
      fase2: !isNaN(fase2) ? fase2 : dadosExistentes?.fase2 ?? 0,
      fase3: !isNaN(fase3) ? fase3 : dadosExistentes?.fase3 ?? 0,
    };

    const total = novosDados.fase1 + novosDados.fase2 + novosDados.fase3;
    console.log("✅ Dados finais a salvar:", { ...novosDados, total });

    const progresso = await prisma.progresso.upsert({
      where: { usuario },
      update: { ...novosDados, total },
      create: { usuario, ...novosDados, total },
    });

    console.log("📌 Progresso salvo/atualizado:", progresso);
    res.status(201).json({ mensagem: "Progresso salvo com sucesso", progresso });
  } catch (error) {
    console.error("❌ Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro interno ao salvar progresso" });
  }
});

// Rota para buscar progresso de um usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;
  console.log("📤 Requisição GET /progresso para usuário:", usuario);

  if (!usuario) {
    return res.status(400).json({ error: "Usuário não especificado" });
  }

  try {
    const progresso = await prisma.progresso.findUnique({
      where: { usuario: usuario.toLowerCase() },
    });

    if (!progresso) {
      console.warn("⚠️ Progresso não encontrado para:", usuario);
      return res.status(404).json({ error: "Progresso não encontrado" });
    }

    console.log("📦 Progresso encontrado:", progresso);
    res.json(progresso);
  } catch (error) {
    console.error("❌ Erro ao buscar progresso:", error);
    res.status(500).json({ error: "Erro ao buscar progresso" });
  }
});

// Rota para gerar ranking geral
app.get("/relatorio", async (req, res) => {
  console.log("📊 Gerando relatório...");

  try {
    const relatorio = await prisma.progresso.findMany({
      orderBy: { total: "desc" },
      select: {
        usuario: true,
        fase1: true,
        fase2: true,
        fase3: true,
        total: true,
      },
    });

    console.log("📈 Relatório gerado:", relatorio);
    res.json(relatorio);
  } catch (error) {
    console.error("❌ Erro ao gerar relatório:", error);
    res.status(500).json({ mensagem: "Erro ao gerar relatório" });
  }
});

// ✅ NOVA ROTA: salvar token do FCM
app.post("/api/salvar-token", async (req, res) => {
  const { token } = req.body;
  console.log("📥 Token recebido:", token);

  if (!token || typeof token !== "string") {
    console.warn("⚠️ Token inválido:", token);
    return res.status(400).json({ mensagem: "Token inválido" });
  }

  try {
    const existe = await prisma.token.findUnique({ where: { token } });

    if (!existe) {
      await prisma.token.create({ data: { token } });
      console.log("✅ Token salvo no banco");
    } else {
      console.log("ℹ️ Token já existe no banco, não será duplicado");
    }

    res.json({ mensagem: "Token salvo com sucesso" });
  } catch (error) {
    console.error("❌ Erro ao salvar token:", error);
    res.status(500).json({ mensagem: "Erro ao salvar token" });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));


app.get("/ping", (req, res) => {
  res.send("✅ API online!");
});
