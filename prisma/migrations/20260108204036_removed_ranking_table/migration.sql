/*
  Warnings:

  - You are about to drop the `Ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_domainId_fkey";

-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "ranking" INTEGER;

-- DropTable
DROP TABLE "Ranking";
