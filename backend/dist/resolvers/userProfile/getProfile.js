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
exports.viewProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const viewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountNumber } = req.body;
        const userID = yield prisma.bankAccount.findUnique({
            where: {
                accountNumber: accountNumber,
            },
            select: {
                userId: true,
            },
        });
        const userInfo = yield prisma.user.findUnique({
            where: {
                id: userID === null || userID === void 0 ? void 0 : userID.userId,
            },
            select: {
                userProfile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!userInfo) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User data fetched successfully", userInfo });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ message: "Error occurred while fetching user data" });
    }
});
exports.viewProfile = viewProfile;
