import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const createLoan = async (req: Request, res: Response): Promise<any> => {
  const prisma = new PrismaClient();
  try {
    const { userId, accountId, amount, interestRate, termMonths, status } =
      req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User is not found" });

    const account = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });
    if (!account || account.userId !== userId) {
      return res.status(404).json({ error: "User's account is not found" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + termMonths);

    const adminAccountId = process.env.ADMIN_ACCOUNT_ID; 
    console.log("Admin account ID:", adminAccountId);

    const adminAccount = await prisma.bankAccount.findUnique({
      where: { id: adminAccountId },
    });

    if (!adminAccount) {
      return res.status(404).json({ error: "Admin account not found" });
    }

    if (adminAccount.balance < amount) {
      return res
        .status(400)
        .json({ error: "Admin account has insufficient balance" });
    }

    const loan = await prisma.$transaction(async (tx) => {
        await tx.bankAccount.update({
          where: { id: adminAccountId },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });
      
        await tx.bankAccount.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      
        return tx.loan.create({
          data: {
            userId,
            accountId,
            interestRate,
            amount,
            termMonths,
            startDate,
            endDate,
            status,
          },
        });
      });
      

    res.status(201).json({ message: "Loan created successfully", loan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err, message: "Loan creation failed" });
  } finally {
    await prisma.$disconnect();
  }
};
