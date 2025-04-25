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
exports.getAccountIncomeOutcome = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET the income and outcome for a specific account
const getAccountIncomeOutcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params; // accountId from URL
    try {
        // Total income (where the account is receiving money)
        const totalIncome = yield prisma.transaction.aggregate({
            _sum: {
                amount: true, // Sum up the amount for income transactions
            },
            where: {
                toAccountId: accountId,
            },
        });
        // Total outcome (where the account is sending money)
        const totalOutcome = yield prisma.transaction.aggregate({
            _sum: {
                amount: true, // Sum up the amount for outcome transactions
            },
            where: {
                fromAccountId: accountId,
            },
        });
        res.status(200).json({
            totalIncome: totalIncome._sum.amount || 0,
            totalOutcome: totalOutcome._sum.amount || 0,
        });
    }
    catch (error) {
        console.error("Error calculating income/outcome:", error);
        res.status(500).json({ message: "Failed to calculate income/outcome" });
    }
});
exports.getAccountIncomeOutcome = getAccountIncomeOutcome;
