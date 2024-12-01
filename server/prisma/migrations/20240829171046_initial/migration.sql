/*
  Warnings:

  - Added the required column `user_name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_password" TEXT NOT NULL;
