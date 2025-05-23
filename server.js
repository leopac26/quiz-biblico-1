const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para salvar ou atualizar progresso
app.post("/progresso", async (req, res) => {
  const { usuario, fase, pontuacao } = req.body;

  console.log("Dados recebidos para salvar o progresso:", { usuario, fase, pontuacao });

  if (!usuario?.trim() || fase == null || pontuacao == null || fase < 1 || pontuacao < 0) {
    return res.status(400).json({ mensagem: "Dados inválidos" });
  }

  try {
    // Verifica se já existe progresso desse usuário para essa fase
    const progressoExistente = await prisma.progresso.findFirst({
      where: { usuario, fase },
    });

    let resultado;
    if (progressoExistente) {
      // Atualiza o progresso existente
      resultado = await prisma.progresso.update({
        where: { id: progressoExistente.id },
        data: { pontuacao },
      });
    } else {
      // Cria novo progresso
      resultado = await prisma.progresso.create({
        data: { usuario, fase, pontuacao },
      });
    }

    res.status(201).json({
      mensagem: "Progresso salvo com sucesso",
      progresso: resultado,
    });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao salvar progresso" });
  }
});

// Rota para buscar o último progresso do usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;

  console.log("Consultando progresso para o usuário:", usuario);

  if (!usuario?.trim()) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  try {
    const progresso = await prisma.progresso.findFirst({
      where: { usuario },
      orderBy: { id: "desc" },
    });

    if (!progresso) {
      return res.status(404).json({ mensagem: "Progresso não encontrado" });
    }

    res.json(progresso);
  } catch (error) {
    console.error("Erro ao consultar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao consultar progresso" });
  }
});

// Rota para buscar todo o histórico de progresso de um usuário
app.get("/progresso/todos", async (req, res) => {
  const { usuario } = req.query;

  if (!usuario?.trim()) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  try {
    const lista = await prisma.progresso.findMany({
      where: { usuario },
      orderBy: { fase: "asc" },
    });
    res.json(lista);
  } catch (err) {
    console.error("Erro ao consultar progresso:", err);
    res.status(500).json({ mensagem: "Erro ao consultar progresso" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
