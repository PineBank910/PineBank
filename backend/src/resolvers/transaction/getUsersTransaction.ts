import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTransaction = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { accountNumber } = req.body;

    const account = await prisma.bankAccount.findUnique({
      where: {
        accountNumber: accountNumber,
      },
      select: {
        id: true,
        balance: true,
      },
    });

    if (!account) {
      console.log("Bank account not found");
      return res.status(400).json({ message: "Bank account not found" });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ fromAccountId: account.id }, { toAccountId: account.id }],
      },
      orderBy: {
        timestamp: "asc",
      },
      select: {
        amount: true,
        timestamp: true,
        reference: true,
      },
    });

    res.json({
      message: "User data fetched successfully",
      balance: account.balance,
      transactions,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occurred while fetching user data" });
  }
};
