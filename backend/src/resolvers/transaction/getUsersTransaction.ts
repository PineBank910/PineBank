import { getAuth } from "@clerk/express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTransaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      console.log("User ID is missing");
      res.status(400).json({ message: "User ID is missing from the token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
      },
    });

    if (!user || !user.accounts.length) {
      return res
        .status(404)
        .json({ message: "No bank accounts found for user" });
    }

    const account = user.accounts[0];
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ fromAccountId: account.id }, { toAccountId: account.id }],
      },
      orderBy: {
        timestamp: "desc",
      },
      select: {
        id: true,
        amount: true,
        timestamp: true,
        reference: true,
        fromAccountId: true,
        toAccountId: true,
      },
    });

    let runningBalance = account.balance;
    const historyWithBalance = transactions.map((tx) => {
      const isCredit = tx.toAccountId === account.id;
      const isDebit = tx.fromAccountId === account.id;

      const entry = {
        id: tx.id,
        amount: tx.amount,
        timestamp: tx.timestamp,
        reference: tx.reference,
        type: isCredit ? "CREDIT" : "DEBIT",
        runningBalance,
      };

      if (isCredit) runningBalance -= tx.amount;
      if (isDebit) runningBalance += tx.amount;

      return entry;
    });

    return res.json({
      currentBalance: account.balance,
      transactions: historyWithBalance.reverse(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
