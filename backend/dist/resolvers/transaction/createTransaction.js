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
exports.createTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromAccountId, toAccountId, amount, reference, } = req.body;
    if (!fromAccountId || !toAccountId || !amount || isNaN(amount)) {
        res.status(400).json({ message: "Invalid transaction data" });
    }
    try {
        // Validate accounts
        const fromAccount = yield prisma.bankAccount.findUnique({
            where: { id: fromAccountId },
        });
        const toAccount = yield prisma.bankAccount.findUnique({
            where: { id: toAccountId },
        });
        if (!fromAccount || !toAccount) {
            res.status(404).json({ message: "One or both accounts not found" });
        }
        // Ensure sufficient balance in the fromAccount for outcome (debit)
        if (fromAccount && fromAccount.balance < amount) {
            res.status(400).json({ message: "Insufficient balance" });
        }
        else {
            const transaction = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                // Create the transaction record
                const createdTransaction = yield tx.transaction.create({
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
                    yield tx.bankAccount.update({
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
                    yield tx.bankAccount.update({
                        where: { id: toAccountId },
                        data: {
                            balance: {
                                increment: amount,
                            },
                        },
                    });
                }
                // Update transaction to COMPLETED
                yield tx.transaction.update({
                    where: { id: createdTransaction.id },
                    data: {
                        status: "COMPLETED",
                    },
                });
                return createdTransaction;
            }));
            res.status(201).json({
                message: "Transaction successful",
                transaction,
            });
        }
        // Start the transaction: debit and credit
    }
    catch (error) {
        console.error("Transaction error:", error);
        res.status(500).json({ message: "Transaction failed" });
    }
});
exports.createTransaction = createTransaction;
