// src/routers/userRouter.ts
import express from "express";
import { createUser } from "../resolvers/user/createUser";
import { login } from "../resolvers/user/loginUser";
import { authorizationMiddleware } from "../middlewares/authorization";
import { getUser } from "../resolvers/user/getUser";
import { validate } from "../middlewares/validate";
import { userSignupSchema, loginSchema } from "../validators/userSchema";

export const userRouter = express.Router();

userRouter.post("/signup", validate(userSignupSchema), createUser);
userRouter.post("/login", validate(loginSchema), login);
userRouter.get("/", authorizationMiddleware, getUser);
