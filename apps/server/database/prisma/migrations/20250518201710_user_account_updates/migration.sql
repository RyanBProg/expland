/*
  Warnings:

  - Added the required column `refreshTokenId` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "refreshTokenId" TEXT NOT NULL;
