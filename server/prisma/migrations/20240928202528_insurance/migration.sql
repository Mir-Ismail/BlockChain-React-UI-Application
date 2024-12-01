/*
  Warnings:

  - You are about to drop the column `cnic` on the `InsuranceBuyer` table. All the data in the column will be lost.
  - You are about to drop the `EmploymentInformation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `annual_income` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_address` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_name` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_registration_number` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_type` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_status` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `government_department` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `government_designation` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_title` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `InsuranceBuyer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "InsuranceBuyer_cnic_key";

-- AlterTable
ALTER TABLE "InsuranceBuyer" DROP COLUMN "cnic",
ADD COLUMN     "annual_income" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "business_address" TEXT NOT NULL,
ADD COLUMN     "business_name" TEXT NOT NULL,
ADD COLUMN     "business_registration_number" TEXT NOT NULL,
ADD COLUMN     "business_type" TEXT NOT NULL,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "employment_status" TEXT NOT NULL,
ADD COLUMN     "government_department" TEXT NOT NULL,
ADD COLUMN     "government_designation" TEXT NOT NULL,
ADD COLUMN     "job_title" TEXT NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "EmploymentInformation";
