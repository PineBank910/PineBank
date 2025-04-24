import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateBankAccountNumber } from "../../utils/generateBankAccount";;
const prisma = new PrismaClient();
 
export const createAccount = async (
  req: Request,
  res: Response
) => {
  const { type, userId, balance } = req.body;
 
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
 
    if (!user) {
       res.status(404).json({ error: "User not found" });
    }
 
    const createdAccount = await prisma.bankAccount.create({
      data: {
        accountNumber: generateBankAccountNumber(),
        type,
        balance,
        user: {
          connect: { id: userId },
        },
      },
    });
 
     res.status(201).json({
      message: "Account created successfully",
      account: createdAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error);
     res.status(500).json({ message: "An error occurred while creating the account" });
  }
};
 