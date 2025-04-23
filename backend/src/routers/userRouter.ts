import express from "express";
import { createUser } from "../resolvers/user/createUser";
import { login } from "../resolvers/user/loginUser";
import { authorizationMiddleware } from "../middlewares/authorization";
import { getUser } from "../resolvers/user/getUser";

export const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);
userRouter.get("/", authorizationMiddleware, getUser);
