// index.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const CAMINHO_ARQUIVO = path.join(__dirname, "dados.json");

app.use(cors());
app.use(bodyParser.json());

app.post("/progresso", (req, res) => {
  const dados = req.body;
  console.log("Dados adquiridos:", dados);

  let registros = [];

  // Lê o arquivo existente, se houver
  if (fs.existsSync(CAMINHO_ARQUIVO)) {
    try {
      const conteudo = fs.readFileSync(CAMINHO_ARQUIVO, "utf8");
      registros = JSON.parse(conteudo);
    } catch (erro) {
      console.error("Erro ao ler ou parsear o arquivo:", erro);
      return res.status(500).json({ mensagem: "Erro ao acessar os dados salvos." });
    }
  }

  // Adiciona novo registro com data/hora
  registros.push({
    ...dados,
    recebidoEm: new Date().toISOString()
  });

  // Salva novamente no arquivo
  try {
    fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(registros, null, 2), "utf8");
    res.status(200).json({ mensagem: "Progresso salvo com sucesso!" });
  } catch (erro) {
    console.error("Erro ao salvar os dados:", erro);
    res.status(500).json({ mensagem: "Erro ao salvar os dados." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
