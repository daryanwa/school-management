-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisoId_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "supervisoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisoId_fkey" FOREIGN KEY ("supervisoId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
