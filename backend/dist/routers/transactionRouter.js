"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const createTransaction_1 = require("../resolvers/transaction/createTransaction");
const accountTransaction_1 = require("../resolvers/transaction/accountTransaction");
exports.transactionRouter = express_1.default.Router();
exports.transactionRouter.post("/", createTransaction_1.createTransaction);
exports.transactionRouter.get("/:accountId/income-outcome", accountTransaction_1.getAccountIncomeOutcome);
