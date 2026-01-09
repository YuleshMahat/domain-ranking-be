/*
  Warnings:

  - You are about to drop the column `ranking` on the `Domain` table. All the data in the column will be lost.
  - Added the required column `rank` to the `Domain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "ranking",
ADD COLUMN     "rank" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "domainId" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
