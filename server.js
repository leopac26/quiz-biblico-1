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

  console.log("req.body recebido:", req.body);

  // Validação dos dados
  if (
    typeof usuario !== "string" || !usuario.trim() ||
    typeof fase !== "number" || fase < 1 ||
    typeof pontuacao !== "number" || pontuacao < 0
  ) {
    return res.status(400).json({ mensagem: "Dados inválidos" });
  }

  try {
    // Verifica se já existe progresso desse usuário para essa fase
    const progressoExistente = await prisma.progresso.findFirst({
      where: {
        usuario: usuario.trim(),
        fase,
      },
    });

    let resultado;
    if (progressoExistente) {
      console.log(`Atualizando progresso para o usuário ${usuario}, fase ${fase}`);
      resultado = await prisma.progresso.update({
        where: { id: progressoExistente.id },
        data: { pontuacao },
      });
    } else {
      console.log(`Criando novo progresso para o usuário ${usuario}, fase ${fase}`);
      resultado = await prisma.progresso.create({
        data: {
          usuario: usuario.trim(),
          fase,
          pontuacao,
        },
      });
    }

    res.status(201).json({
      mensagem: "Progresso salvo com sucesso",
      progresso: resultado,
    });
  } catch (error) {
    console.error("Erro ao salvar progresso:", JSON.stringify(error, null, 2));
    res.status(500).json({
      mensagem: "Erro interno ao salvar progresso",
      detalhe: error.message || "Erro desconhecido",
    });
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
      where: { usuario: usuario.trim() },
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

  console.log("Consultando todo o histórico de progresso para o usuário:", usuario);

  if (!usuario?.trim()) {
    return res.status(400).json({ mensagem: "Usuário não informado" });
  }

  try {
    const lista = await prisma.progresso.findMany({
      where: { usuario: usuario.trim() },
      orderBy: { fase: "asc" },
    });
    res.json(lista);
  } catch (err) {
    console.error("Erro ao consultar histórico de progresso:", err);
    res.status(500).json({ mensagem: "Erro ao consultar histórico de progresso" });
  }
});

// Rota para gerar o relatório de progresso por fase
app.get("/relatorio", async (req, res) => {
  try {
    const result = await prisma.progresso.groupBy({
      by: ["usuario"],
      _max: {
        fase: true,
      },
      _sum: {
        pontuacao: true,
      },
    });

    // Organiza os dados para o formato desejado
    const relatorio = result.map((row) => ({
      usuario: row.usuario,
      fase1: row._sum.pontuacao[0] || 0,
      fase2: row._sum.pontuacao[1] || 0,
      fase3: row._sum.pontuacao[2] || 0,
    }));

    res.json(relatorio);
  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ mensagem: "Erro ao gerar relatório" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
