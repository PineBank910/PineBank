import express from "express";
import { createTransaction } from "../resolvers/transaction/createTransaction";
import { getAccountIncomeOutcome } from "../resolvers/transaction/accountTransaction";

export const transactionRouter = express.Router(); 

transactionRouter.post("/",  createTransaction);
transactionRouter.get("/:accountId/income-outcome",  getAccountIncomeOutcome);

