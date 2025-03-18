/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Board_userId_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Board_projectId_key" ON "Board"("projectId");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
