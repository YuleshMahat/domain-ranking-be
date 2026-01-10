/*
  Warnings:

  - A unique constraint covering the columns `[domainId,date]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ranking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_domainId_date_key" ON "Ranking"("domainId", "date");
