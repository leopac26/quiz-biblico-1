

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://leonardopac26:Lidileo%402018@meubanco.qsurucu.mongodb.net/quizbiblico?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado ao MongoDB"))
.catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Definir o modelo de dados usando Mongoose
const progressoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  fase: { type: Number, required: true },
  pontuacao: { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now }
});

const Progresso = mongoose.model('Progresso', progressoSchema);

app.use(cors());
app.use(express.json());

// Rota para salvar progresso
app.post("/progresso", async (req, res) => {
  const { usuario, fase, pontuacao } = req.body;

  // Validação de dados
  if (
    !usuario || typeof usuario !== "string" ||
    typeof fase !== "number" ||
    typeof pontuacao !== "number"
  ) {
    return res.status(400).json({ mensagem: "Dados inválidos. Verifique os tipos." });
  }

  try {
    const novoProgresso = new Progresso({ usuario, fase, pontuacao });
    await novoProgresso.save();
    res.status(201).json({
      mensagem: "Progresso salvo com sucesso",
      progresso: novoProgresso
    });
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao salvar progresso", erro: error.message });
  }
});

// Rota para consultar o último progresso do usuário
app.get("/progresso", async (req, res) => {
  const { usuario } = req.query;

  // Verificação de parâmetros
  if (!usuario || typeof usuario !== "string") {
    return res.status(400).json({ mensagem: "Usuário não informado ou inválido" });
  }

  try {
    const progresso = await Progresso.find({ usuario }).sort({ criadoEm: -1 }).limit(1);

    if (progresso.length === 0) {
      return res.status(404).json({ mensagem: "Progresso não encontrado" });
    }

    res.json(progresso[0]); // Retorna o último progresso
  } catch (error) {
    console.error("Erro ao consultar progresso:", error);
    res.status(500).json({ mensagem: "Erro ao consultar progresso", erro: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
