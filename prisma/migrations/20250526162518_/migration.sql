/*
  Warnings:

  - The primary key for the `Progresso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuario` on the `Progresso` table. All the data in the column will be lost.
  - Added the required column `user` to the `Progresso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progresso" DROP CONSTRAINT "Progresso_pkey",
DROP COLUMN "usuario",
ADD COLUMN     "user" TEXT NOT NULL,
ADD CONSTRAINT "Progresso_pkey" PRIMARY KEY ("user");
