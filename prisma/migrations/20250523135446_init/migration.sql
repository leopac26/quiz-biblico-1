-- CreateTable
CREATE TABLE "Progresso" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "fase" INTEGER NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id")
);
