const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para salvar ou atualizar progresso com campos separados por fase
app.post("/progresso", async (req, res) => {
  console.log("📥 Dados recebidos:", req.body); // Log de entrada

  let { usuario, fase1, fase2, fase3 } = req.body;

  if (!usuario || typeof usuario !== "string") {
    return res.status(400).json({ mensagem: "Nome de usuário inválido." });
  }

  // Converte valores para número (ou undefined se estiver ausente)
  fase1 = fase1 !== undefined ? Number(fase1) : undefined;
  fase2 = fase2 !== undefined ? Number(fase2) : undefined;
  fase3 = fase3 !== undefined ? Number(fase3) : undefined;

  // Verifica se ao menos uma fase foi enviada e é válida
  if ([fase1, fase2, fase3].every(val => val === undefined || isNaN(val))) {
    return res.status(400).json({ mensagem: "Nenhuma fase válida foi enviada." });
  }

  try {
    const dadosExistentes = await prisma.progresso.findUnique({
      where: { usuario },
    });

    const novosDados = {
      fase1: !isNaN(fase1) ? fase1 : dadosExistentes?.fase1 ?? 0,
      fase2: !isNaN(fase2) ? fase2 : dadosExistentes?.fase2 ?? 0,
      fase3: !isNaN(fase3) ? fase3 : dadosExistentes?.fase3 ?? 0,
    };

    const total = novosDados.fase1 + novosDados.fase2 + novosDados.fase3;

    const progresso = await prisma.progresso.upsert({
      where: { usuario },
      update: { ...novosDados, total },
      create: { usuario, ...novosDados, total },
    });

    res.status(201).json({ mensagem: "Progresso salvo com sucesso", progresso });
  } catch (error) {
    console.error("❌ Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro interno ao salvar progresso" });
  }
});

// Rota para buscar progresso de um usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;

  if (!usuario?.trim()) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  try {
    const progresso = await prisma.progresso.findUnique({
      where: { usuario: usuario.trim() },
    });

    if (!progresso) {
      return res.status(404).json({ mensagem: "Progresso não encontrado" });
    }

    res.json(progresso);
  } catch (error) {
    console.error("❌ Erro ao consultar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao consultar progresso" });
  }
});

// Rota para gerar o ranking geral
app.get("/relatorio", async (req, res) => {
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

    res.json(relatorio);
  } catch (error) {
    console.error("❌ Erro ao gerar relatório:", error);
    res.status(500).json({ mensagem: "Erro ao gerar relatório" });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
