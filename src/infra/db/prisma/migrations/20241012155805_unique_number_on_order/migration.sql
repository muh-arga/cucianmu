/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_number_merchantId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");
