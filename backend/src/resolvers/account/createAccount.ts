import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import { generateBankAccountNumber } from "../../utils/generateBankAccount";

const prisma = new PrismaClient();

export const createAccount = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = await prisma.bankAccount.create({
      data: {
        accountNumber: generateBankAccountNumber(),
        type: "BUSINESS",
        balance: 0,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({
      message: "Bank account created successfully",
      account,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
