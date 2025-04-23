/*
  Warnings:

  - Made the column `accountId` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_accountId_fkey";

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "accountId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
