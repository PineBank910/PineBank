
// function generateFakeBankAccountNumber(): string {
//   const bankCode = '321';
//   const branchCode = Math.floor(1000 + Math.random() * 9000);
//   const accountBase = Math.floor(10000000 + Math.random() * 90000000);
//   return `${bankCode}${branchCode}${accountBase}`;
// }

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, passwordUser } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(passwordUser, 10);

    const user = {
      email,
      name,
      password: encryptedPassword,
    };

    const createdUser = await prisma.user.create({ data: user });

    res.json({
      message: "success",
      user: createdUser,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Error occurred" });
  }
};

