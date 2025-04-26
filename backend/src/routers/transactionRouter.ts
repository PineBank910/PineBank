import express from "express";
import { createTransaction } from "../resolvers/transaction/createTransaction";
import { getAccountIncomeOutcome } from "../resolvers/transaction/accountTransaction";
import { authorizationMiddleware } from "../middlewares/authorization";

export const transactionRouter = express.Router(); 

transactionRouter.post("/", authorizationMiddleware, createTransaction);
transactionRouter.get("/:accountId/income-outcome", authorizationMiddleware, getAccountIncomeOutcome);

