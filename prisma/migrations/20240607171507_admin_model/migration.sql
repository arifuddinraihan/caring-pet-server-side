-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "morePetPhoto" TEXT[],
ADD COLUMN     "petProfilePhoto" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activeStatus" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "profilePhoto" TEXT;
