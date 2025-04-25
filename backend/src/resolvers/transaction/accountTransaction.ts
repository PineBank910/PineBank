import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET the income and outcome for a specific account
export const getAccountIncomeOutcome = async (req: Request, res: Response) => {
  const { accountId } = req.params; // accountId from URL

  try {
    // Total income (where the account is receiving money)
    const totalIncome = await prisma.transaction.aggregate({
      _sum: {
        amount: true, // Sum up the amount for income transactions
      },
      where: {
        toAccountId: accountId,
      },
    });

    // Total outcome (where the account is sending money)
    const totalOutcome = await prisma.transaction.aggregate({
      _sum: {
        amount: true, // Sum up the amount for outcome transactions
      },
      where: {
        fromAccountId: accountId,
      },
    });

    res.status(200).json({
      totalIncome: totalIncome._sum.amount || 0,
      totalOutcome: totalOutcome._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error calculating income/outcome:", error);
    res.status(500).json({ message: "Failed to calculate income/outcome" });
  }
};
