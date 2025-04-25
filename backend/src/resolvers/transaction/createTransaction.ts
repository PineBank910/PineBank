import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction = async (req: Request, res: Response) => {
  const { fromAccountId, toAccountId, amount, reference, } = req.body;

  if (!fromAccountId || !toAccountId || !amount || isNaN(amount) ){
     res.status(400).json({ message: "Invalid transaction data" });
  }

  try {
    // Validate accounts
    const fromAccount = await prisma.bankAccount.findUnique({
      where: { id: fromAccountId },
    });

    const toAccount = await prisma.bankAccount.findUnique({
      where: { id: toAccountId },
    });

    if (!fromAccount || !toAccount) {
       res.status(404).json({ message: "One or both accounts not found" });
    }

    // Ensure sufficient balance in the fromAccount for outcome (debit)
    if (fromAccount && fromAccount.balance < amount) {
       res.status(400).json({ message: "Insufficient balance" });
    }
    else{
        const transaction = await prisma.$transaction(async (tx) => {
            // Create the transaction record
            const createdTransaction = await tx.transaction.create({
              data: {
                fromAccountId,
                toAccountId,
                amount,
                reference,
                status: "PENDING", // Start as pending, update after balance update
              },
            });
      
            // Debit from the sender account (OUTCOME)
            if (fromAccountId) {
              await tx.bankAccount.update({
                where: { id: fromAccountId },
                data: {
                  balance: {
                    decrement: amount,
                  },
                },
              });
            }
      
            // Credit to the receiver account (INCOME)
            if (toAccountId) {
              await tx.bankAccount.update({
                where: { id: toAccountId },
                data: {
                  balance: {
                    increment: amount,
                  },
                },
              });
            }
      
            // Update transaction to COMPLETED
            await tx.transaction.update({
              where: { id: createdTransaction.id },
              data: {
                status: "COMPLETED",
              },
            });
      
            return createdTransaction;
          });
      
          res.status(201).json({
            message: "Transaction successful",
            transaction,
          });
    }

    // Start the transaction: debit and credit
    
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ message: "Transaction failed" });
  }
};
