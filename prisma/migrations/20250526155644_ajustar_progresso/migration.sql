/*
  Warnings:

  - The primary key for the `Progresso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `criadoEm` on the `Progresso` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Progresso` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Progresso_usuario_key";

-- AlterTable
ALTER TABLE "Progresso" DROP CONSTRAINT "Progresso_pkey",
DROP COLUMN "criadoEm",
DROP COLUMN "id",
ALTER COLUMN "fase1" DROP DEFAULT,
ALTER COLUMN "fase2" DROP DEFAULT,
ALTER COLUMN "fase3" DROP DEFAULT,
ALTER COLUMN "total" DROP DEFAULT,
ADD CONSTRAINT "Progresso_pkey" PRIMARY KEY ("usuario");
