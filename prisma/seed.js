const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.progresso.createMany({
    data: [
      { usuario: "joao", fase1: 3, fase2: 2, fase3: 4 },
      { usuario: "maria", fase1: 5, fase2: 5, fase3: 4 },
      { usuario: "ana", fase1: 2, fase2: 3, fase3: 1 },
      { usuario: "pedro", fase1: 4, fase2: 4, fase3: 4 },
      { usuario: "lucas", fase1: 1, fase2: 2, fase3: 3 },
    ],
  });

  console.log("✅ Dados de teste inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
