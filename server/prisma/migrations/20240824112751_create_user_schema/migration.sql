/*
  Warnings:

  - You are about to drop the column `UserId` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_UserId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");
