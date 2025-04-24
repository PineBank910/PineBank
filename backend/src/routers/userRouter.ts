import express from "express";
// import { createUser } from "../resolvers/user/createUser";
// import { login } from "../resolvers/user/loginUser";
import { authorizationMiddleware } from "../middlewares/authorization";
import { getUser } from "../resolvers/user/getUser";
import { CreateUserV2 } from "../resolvers/user/createUserV2";

export const userRouter = express.Router();

userRouter.post("/signup", CreateUserV2);
// userRouter.post("/login", login);
userRouter.get("/", authorizationMiddleware, getUser);
