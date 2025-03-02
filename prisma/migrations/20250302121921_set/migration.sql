/*
  Warnings:

  - Made the column `address` on table `Setting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "address" SET NOT NULL;
