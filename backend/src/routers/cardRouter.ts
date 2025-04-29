import express from "express";
import { createBankCard } from "../resolvers/bankCard/createCard"; 

export const cardRouter = express.Router();

cardRouter.post("/:bankAccountId",  createBankCard);