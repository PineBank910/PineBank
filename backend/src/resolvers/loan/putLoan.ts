import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { calculateEarlyRepayment } from "../../utils/calculateAmount";

const prisma = new PrismaClient();

export const putLoan = async (req: Request, res: Response): Promise<any> => {
  const { loanId } = req.params;

  try {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    if (loan.status === "CLOSED") {
      return res.status(400).json({ error: "Loan already completed" });
    }

    const account = await prisma.bankAccount.findUnique({
      where: { id: loan.accountId },
    });

    const adminAccountId = process.env.ADMIN_ACCOUNT_ID;
    if (!adminAccountId) {
      return res.status(500).json({ error: "Admin account not configured" });
    }

    const adminAccount = await prisma.bankAccount.findUnique({
      where: { id: adminAccountId },
    });

    if (!account || !adminAccount) {
      return res.status(404).json({ error: "Bank accounts not found" });
    }

    const currentDate = new Date();
    let totalRepayment = 0;
    let interest = 0;

    if (currentDate >= loan.endDate) {
      const termYears = loan.termMonths / 12;
      interest = loan.amount * loan.interestRate * termYears;
      totalRepayment = loan.amount + interest;
    } else {
      const earlyRepayment = calculateEarlyRepayment(
        loan.amount,
        loan.interestRate,
        loan.startDate,
        currentDate
      );
      interest = earlyRepayment.interest;
      totalRepayment = earlyRepayment.totalRepayment;
    }

    if (account.balance < totalRepayment) {
      return res.status(400).json({
        error: "Insufficient funds in borrower's account for repayment",
        needed: totalRepayment,
        currentBalance: account.balance,
      });
    }

    const updatedLoan = await prisma.$transaction(async (tx) => {
      await tx.bankAccount.update({
        where: { id: account.id },
        data: {
          balance: {
            decrement: totalRepayment,
          },
        },
      });

      await tx.bankAccount.update({
        where: { id: adminAccountId },
        data: {
          balance: {
            increment: totalRepayment,
          },
        },
      });

      return tx.loan.update({
        where: { id: loanId },
        data: {
          status: "CLOSED",
        },
      });
    });

    return res.status(200).json({
      message: "Loan marked as completed and repayment processed",
      loan: updatedLoan,
      totalRepaid: totalRepayment,
      interestPaid: interest,
    });
  } catch (err) {
    console.error("Loan completion error:", err);
    return res.status(500).json({ error: "Failed to complete loan" });
  }
};
