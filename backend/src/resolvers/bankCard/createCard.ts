import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBankCard = async (req: Request, res: Response) => {
  const { cardNumber, cardType, expiration, cvv, bankAccountId } = req.body;

  if (!cardNumber || !cardType || !expiration || !cvv || !bankAccountId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const validCardTypes = ["DEBIT", "CREDIT"];
  if (!validCardTypes.includes(cardType)) {
    return res.status(400).json({ message: "Invalid card type" });
  }

  const expirationDate = new Date(expiration);
  if (isNaN(expirationDate.getTime())) {
    return res.status(400).json({ message: "Invalid expiration date" });
  }

  try {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: bankAccountId },
    });

    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    const newCard = await prisma.card.create({
      data: {
        cardNumber,
        cardType,
        expiration: expirationDate,
        cvv,
        bankAccount: {
          connect: { id: bankAccountId },
        },
      },
    });

    res.status(201).json({
      message: "Bank card created successfully",
      card: newCard,
    });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Error creating bank card" });
  }
};
