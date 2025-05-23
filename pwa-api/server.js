/*const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para salvar progresso
app.post("/progresso", async (req, res) => {
  const { usuario, fase, pontuacao } = req.body;

  if (!usuario || fase == null || pontuacao == null) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }

  try {
    const novoProgresso = await prisma.progresso.create({
      data: { usuario, fase, pontuacao },
    });
    res.status(201).json({
      mensagem: "Progresso salvo com sucesso",
      progresso: novoProgresso,
    });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao salvar progresso" });
  }
});

// Rota para buscar o último progresso de um usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;

  if (!usuario) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  try {
    console.log("Consultando progresso para o usuário:", usuario);

    const progresso = await prisma.progresso.findFirst({
      where: { usuario },
      orderBy: { id: "desc" }, // Corrigido: ordenando por id (ou outro campo que existe)
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));*/
