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

  if (
    typeof usuario !== "string" || !usuario.trim() ||
    typeof fase !== "number" || fase < 1 ||
    typeof pontuacao !== "number" || pontuacao < 0
  ) {
    return res.status(400).json({ mensagem: "Dados inválidos" });
  }

  try {
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
app.post("/progresso", async (req, res) => {
  const { usuario, fase1, fase2, fase3 } = req.body;

  if (!usuario || typeof usuario !== "string") {
    return res.status(400).json({ mensagem: "Nome de usuário inválido." });
  }

  try {
    const dadosExistentes = await prisma.progresso.findUnique({
      where: { usuario },
    });

    const novosDados = {
      fase1: fase1 ?? dadosExistentes?.fase1 ?? 0,
      fase2: fase2 ?? dadosExistentes?.fase2 ?? 0,
      fase3: fase3 ?? dadosExistentes?.fase3 ?? 0,
    };

    const total = (novosDados.fase1 || 0) + (novosDados.fase2 || 0) + (novosDados.fase3 || 0);

    const progressoAtualizado = await prisma.progresso.upsert({
      where: { usuario },
      update: {
        ...novosDados,
        total,
      },
      create: {
        usuario,
        ...novosDados,
        total,
      },
    });

    res.status(201).json({ mensagem: "Progresso salvo com sucesso", progresso: progressoAtualizado });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao salvar progresso" });
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

// Rota para gerar o relatório com pontuação das 3 fases e total
app.get("/relatorio", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        usuario,
        SUM(CASE WHEN fase = 1 THEN pontuacao ELSE 0 END) AS fase1,
        SUM(CASE WHEN fase = 2 THEN pontuacao ELSE 0 END) AS fase2,
        SUM(CASE WHEN fase = 3 THEN pontuacao ELSE 0 END) AS fase3,
        SUM(pontuacao) AS total_pontuacao
      FROM
        progresso
      GROUP BY
        usuario;
    `;

    res.json(result);
  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ mensagem: "Erro ao gerar relatório" });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
