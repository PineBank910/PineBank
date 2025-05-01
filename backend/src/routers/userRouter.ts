import express from "express";
import { getUser } from "../resolvers/user/getUser";
import { Webhook } from "../resolvers/user/webhook";
export const userRouter = express.Router();

userRouter.post("/webhook", Webhook);
userRouter.get("/", getUser);
