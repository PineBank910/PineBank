"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// src/routers/userRouter.ts
const express_1 = __importDefault(require("express"));
// import { createUser } from "../resolvers/user/createUser";
// import { login } from "../resolvers/user/loginUser";
const authorization_1 = require("../middlewares/authorization");
const getUser_1 = require("../resolvers/user/getUser");
const createUserV2_1 = require("../resolvers/user/createUserV2");
exports.userRouter = express_1.default.Router();
//userRouter.post("/signup", validate(userSignupSchema), createUser);
//userRouter.post("/login", validate(loginSchema), login);
exports.userRouter.post("/signup", createUserV2_1.CreateUserV2);
exports.userRouter.get("/", authorization_1.authorizationMiddleware, getUser_1.getUser);
