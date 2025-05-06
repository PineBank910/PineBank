import express from "express";
import { createAccount } from "../resolvers/account/createAccount";
import { getTransaction } from "../resolvers/transaction/getUsersTransaction";

export const accountRouter = express.Router();

accountRouter.post("/",  createAccount);
accountRouter.get("/statement/:accountNumber", getTransaction);