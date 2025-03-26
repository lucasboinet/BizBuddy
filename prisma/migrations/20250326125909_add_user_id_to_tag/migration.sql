/*
  Warnings:

  - You are about to drop the column `userId` on the `ProjectTag` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectTag" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "userId" TEXT NOT NULL;
