/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `admins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "contactNumber",
DROP COLUMN "isDeleted",
DROP COLUMN "profilePhoto";
