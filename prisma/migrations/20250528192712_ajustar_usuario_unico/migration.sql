/*
  Warnings:

  - Made the column `fase1` on table `Progresso` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fase2` on table `Progresso` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fase3` on table `Progresso` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Progresso` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Progresso" ALTER COLUMN "fase1" SET NOT NULL,
ALTER COLUMN "fase2" SET NOT NULL,
ALTER COLUMN "fase3" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL;
