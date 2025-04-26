import express from "express";
import { createBankCard } from "../resolvers/bankCard/createCard"; 
import { authorizationMiddleware } from "../middlewares/authorization";

export const cardRouter = express.Router();

cardRouter.post("/:bankAccountId", authorizationMiddleware, createBankCard);