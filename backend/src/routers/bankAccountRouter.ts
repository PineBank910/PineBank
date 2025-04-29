import express from "express";
import { createAccount } from "../resolvers/account/createAccount";

export const accountRouter = express.Router();

accountRouter.post("/",  createAccount);