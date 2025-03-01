/*
  Warnings:

  - You are about to drop the column `projectId` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_projectId_fkey";

-- DropIndex
DROP INDEX "Invoice_projectId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "projectId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_customerId_key" ON "Invoice"("customerId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
