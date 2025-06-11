-- CreateTable
CREATE TABLE "Progresso" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "fase1" INTEGER NOT NULL DEFAULT 0,
    "fase2" INTEGER NOT NULL DEFAULT 0,
    "fase3" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Progresso_usuario_key" ON "Progresso"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
