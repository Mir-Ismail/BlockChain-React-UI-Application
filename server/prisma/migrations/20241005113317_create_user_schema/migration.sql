/*
  Warnings:

  - A unique constraint covering the columns `[cnic]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnic` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "cnic" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_cnic_key" ON "Client"("cnic");
