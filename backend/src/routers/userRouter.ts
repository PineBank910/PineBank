import express from "express";
import { getUser } from "../resolvers/user/getUser";
import { CreateUserV2 } from "../resolvers/user/createUserV2";
import { DeleteUser } from "../resolvers/user/deleteUser";

export const userRouter = express.Router();

userRouter.post("/signup", CreateUserV2);
userRouter.get("/", getUser);
userRouter.delete("/delete", DeleteUser);
