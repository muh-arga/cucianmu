/*
  Warnings:

  - You are about to drop the column `userId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `merchantId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_userId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "userId",
ADD COLUMN     "merchantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "merchantId" TEXT NOT NULL,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "estDone" TIMESTAMP(3),
    "doneAt" TIMESTAMP(3),
    "paymentStatus" INTEGER,
    "paymentMethod" TEXT,
    "total" INTEGER,
    "paid" INTEGER,
    "returned" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_merchantId_key" ON "Order"("number", "merchantId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
