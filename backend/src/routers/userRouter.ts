import express from "express";
import { createUser } from "../resolvers/user/createUser";
// import { validateEmail } from "../middleWares/validateEmail";
// import { authorizationMiddleware } from "../middleWares/authorizationUsers";
// import { createUser } from "../resolvers/users/createUser";
// import { login } from "../resolvers/users/login";
// import { getUser } from "../resolvers/users/getUser";
// import { createProfile } from "../resolvers/users/createProfile";

export const userRouter = express.Router();

userRouter.post("/signup", createUser);
// userRouter.get("/", authorizationMiddleware, getUser);
// userRouter.post("/login", login);
// userRouter.post("/profile", authorizationMiddleware, createProfile);