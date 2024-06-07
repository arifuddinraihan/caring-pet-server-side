/*
  Warnings:

  - Made the column `petProfilePhoto` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "petProfilePhoto" SET NOT NULL;
