/*
  Warnings:

  - The primary key for the `Progresso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user` on the `Progresso` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuario]` on the table `Progresso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuario` to the `Progresso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progresso" DROP CONSTRAINT "Progresso_pkey",
DROP COLUMN "user",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "usuario" TEXT NOT NULL,
ADD CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Progresso_usuario_key" ON "Progresso"("usuario");
