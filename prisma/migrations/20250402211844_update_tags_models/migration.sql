/*
  Warnings:

  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ProjectTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectTags" DROP CONSTRAINT "_ProjectTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectTags" DROP CONSTRAINT "_ProjectTags_B_fkey";

-- AlterTable
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_pkey",
ADD CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("projectId", "tagId");

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "projectId" TEXT;

-- DropTable
DROP TABLE "_ProjectTags";
