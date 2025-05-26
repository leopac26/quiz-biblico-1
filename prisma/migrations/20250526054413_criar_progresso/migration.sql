/*
  Warnings:

  - A unique constraint covering the columns `[usuario]` on the table `Progresso` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Progresso_usuario_key" ON "Progresso"("usuario");
