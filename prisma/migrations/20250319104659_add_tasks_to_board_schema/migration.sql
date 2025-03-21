-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "tasks" JSONB NOT NULL DEFAULT '[]';
