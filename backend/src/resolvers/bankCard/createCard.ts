import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateRandomNumber } from "../../utils/generateBankAccount";

const prisma = new PrismaClient();


export const createBankCard = async (req: Request, res: Response)=> {
  
  const { cardType } = req.body;
  const { bankAccountId } = req.params;

  if (!cardType || !bankAccountId) {
     res.status(400).json({ message: "Missing required fields" });
  }

  const validCardTypes = ["DEBIT", "CREDIT"];
  if (!validCardTypes.includes(cardType)) {
     res.status(400).json({ message: "Invalid card type" });
  }

  const cardNumber = generateRandomNumber(16);
  const cvv = generateRandomNumber(3);                
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 2);

  try {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: bankAccountId },
    });

    if (!bankAccount) {
       res.status(404).json({ message: "Bank account not found" });
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
