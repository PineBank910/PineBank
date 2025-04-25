"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBankCard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const bankAccount = yield prisma.bankAccount.findUnique({
            where: { id: bankAccountId },
        });
        if (!bankAccount) {
            return res.status(404).json({ message: "Bank account not found" });
        }
        const newCard = yield prisma.card.create({
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
    }
    catch (error) {
        console.error("Error creating card:", error);
        res.status(500).json({ message: "Error creating bank card" });
    }
});
exports.createBankCard = createBankCard;
