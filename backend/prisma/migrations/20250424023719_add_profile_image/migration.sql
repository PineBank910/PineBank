/*
  Warnings:

  - The `type` column on the `BankAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Loan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `cardType` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `transactionType` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `image` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountEnum" AS ENUM ('SAVINGS', 'BUSINESS');

-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "LoanStatusEnum" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'CLOSED', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "CardEnum" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "TransactionEnum" AS ENUM ('INCOME', 'OUTCOME');

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "type",
ADD COLUMN     "type" "AccountEnum" NOT NULL DEFAULT 'BUSINESS';

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardType",
ADD COLUMN     "cardType" "CardEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "status",
ADD COLUMN     "status" "LoanStatusEnum" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatusEnum" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "transactionType",
ADD COLUMN     "transactionType" "TransactionEnum" NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "image" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AccountType";

-- DropEnum
DROP TYPE "CardType";

-- DropEnum
DROP TYPE "LoanStatus";

-- DropEnum
DROP TYPE "TransactionStatus";

-- DropEnum
DROP TYPE "TransactionType";
