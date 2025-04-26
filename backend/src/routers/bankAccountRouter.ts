import express from "express";
import { createAccount } from "../resolvers/account/createAccount";
import { authorizationMiddleware } from "../middlewares/authorization";

export const accountRouter = express.Router();

accountRouter.post("/", authorizationMiddleware, createAccount);