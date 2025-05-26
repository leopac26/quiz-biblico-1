/*
  Warnings:

  - You are about to drop the column `fase` on the `Progresso` table. All the data in the column will be lost.
  - You are about to drop the column `pontuacao` on the `Progresso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Progresso" DROP COLUMN "fase",
DROP COLUMN "pontuacao",
ADD COLUMN     "fase1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fase2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fase3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;
