
function generateBankAccountNumber(): string {
  const bankCode = '321';
  const branchCode = Math.floor(1000 + Math.random() * 9000);
  const accountBase = Math.floor(10000000 + Math.random() * 90000000);
  return `${bankCode}${branchCode}${accountBase}`;
}

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createAccount = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {

    const account = {
      accountNumber:generateBankAccountNumber(),
      type:"BUSINESS",
    };

    const createdUser = await prisma.user.create({ data: account });

    res.json({
      message: "success",
      user: createdUser,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Error occurred" });
  }
};

