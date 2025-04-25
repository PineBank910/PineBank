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
exports.createAccount = void 0;
const client_1 = require("@prisma/client");
const generateBankAccount_1 = require("../../utils/generateBankAccount");
;
const prisma = new client_1.PrismaClient();
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, userId, balance } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const createdAccount = yield prisma.bankAccount.create({
            data: {
                accountNumber: (0, generateBankAccount_1.generateBankAccountNumber)(),
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
    }
    catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "An error occurred while creating the account" });
    }
});
exports.createAccount = createAccount;
