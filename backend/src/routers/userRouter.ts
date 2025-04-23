import express from "express";
import { createUser } from "../resolvers/user/createUser";
import { login } from "../resolvers/user/loginUser";
// import { authorizationMiddleware } from "../middlewares/authorization";
// import { createUser } from "../resolvers/users/createUser";
// import { login } from "../resolvers/users/login";
// import { getUser } from "../resolvers/users/getUser";
// import { createProfile } from "../resolvers/users/createProfile";

export const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", login);
// userRouter.get("/", authorizationMiddleware, getUser);
// userRouter.post("/profile", authorizationMiddleware, createProfile);