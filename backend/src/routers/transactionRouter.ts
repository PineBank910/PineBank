import express from "express";
import { createTransaction } from "../resolvers/transaction/createTransaction";
import { getAccountIncomeOutcome } from "../resolvers/transaction/accountTransaction";
import { getTransaction } from "../resolvers/transaction/getUsersTransaction";

export const transactionRouter = express.Router();

transactionRouter.post("/", createTransaction);
transactionRouter.get("/:accountId/income-outcome", getAccountIncomeOutcome);
transactionRouter.get("/", getTransaction);
