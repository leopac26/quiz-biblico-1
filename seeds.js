const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dados = [
    { id: 1, usuario: 'leonardopac', criadoEm: new Date('2025-05-23T14:28:11') },
    { id: 5, usuario: 'leonardo pacheco dos santos', criadoEm: new Date('2025-05-23T14:47:21') },
    { id: 6, usuario: 'Alguem', criadoEm: new Date('2025-05-23T14:49:31') },
    { id: 7, usuario: 'Lavinia', criadoEm: new Date('2025-05-23T14:53:22') },
    { id: 9, usuario: 'luiz', criadoEm: new Date('2025-05-23T15:05:19') },
    { id: 11, usuario: 'Ricardo', criadoEm: new Date('2025-05-23T15:33:07') },
    { id: 12, usuario: 'joana', criadoEm: new Date('2025-05-23T15:51:36') },
    { id: 13, usuario: 'hahahah', criadoEm: new Date('2025-05-23T15:58:19') },
    { id: 14, usuario: 'juvenilda', criadoEm: new Date('2025-05-23T16:09:53') },
    { id: 15, usuario: 'Leonardo pacheco', criadoEm: new Date('2025-05-23T17:33:01') },
  ];

  for (const dado of dados) {
    await prisma.progresso.create({
      data: {
        id: dado.id,
        usuario: dado.usuario,
        criadoEm: dado.criadoEm,
        fase1: 0,
        fase2: 0,
        fase3: 0,
        total: 0
      },
    });
  }

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
