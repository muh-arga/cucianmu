/*
  Warnings:

  - Made the column `amount` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "amount" SET NOT NULL;
