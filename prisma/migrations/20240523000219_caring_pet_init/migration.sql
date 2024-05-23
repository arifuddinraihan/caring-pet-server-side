-- AlterTable
ALTER TABLE "adoption-requests" ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "updatedAt" DROP NOT NULL;
