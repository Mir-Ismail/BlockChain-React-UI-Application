/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "InsuranceBuyer" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "marital_status" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emergency_contact_name" TEXT NOT NULL,
    "emergency_contact_phone" TEXT NOT NULL,
    "emergency_contact_relationship" TEXT NOT NULL,

    CONSTRAINT "InsuranceBuyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentInformation" (
    "id" SERIAL NOT NULL,
    "cnic" TEXT NOT NULL,
    "employment_status" TEXT NOT NULL,
    "government_department" TEXT NOT NULL,
    "government_designation" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "business_name" TEXT NOT NULL,
    "business_type" TEXT NOT NULL,
    "annual_income" DOUBLE PRECISION NOT NULL,
    "business_registration_number" TEXT NOT NULL,
    "business_address" TEXT NOT NULL,

    CONSTRAINT "EmploymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceBuyer_cnic_key" ON "InsuranceBuyer"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentInformation_cnic_key" ON "EmploymentInformation"("cnic");
