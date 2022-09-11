/*
  Warnings:

  - Added the required column `quote` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "quote" VARCHAR(1000) NOT NULL;
