import express from "express";
import { getUser } from "../resolvers/user/getUser";
import { CreateUserV2 } from "../resolvers/user/createUserV2";
import { DeleteUser } from "../resolvers/user/deleteUser";
import { UpdateUser } from "../resolvers/user/updateUser";

export const userRouter = express.Router();
userRouter.put("/update", UpdateUser);
userRouter.post("/signup", CreateUserV2);
userRouter.get("/", getUser);
userRouter.delete("/delete", DeleteUser);
