// index.js
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/progresso", (req, res) => {
  const dados = req.body;
  console.log("Dados recebidos:", dados);

  // Lê o arquivo existente ou cria um array vazio se não existir
  let registros = [];
  const caminho = "./dados.json";

  if (fs.existsSync(caminho)) {
    registros = JSON.parse(fs.readFileSync(caminho, "utf8"));
  }

  // Adiciona novo registro com data/hora
  registros.push({
    ...dados,
    recebidoEm: new Date().toISOString()
  });

  // Salva novamente no arquivo
  fs.writeFileSync(caminho, JSON.stringify(registros, null, 2), "utf8");

  res.status(200).json({ mensagem: "Progresso salvo com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
