import express from "express";
import { viewProfile } from "../resolvers/userProfile/getProfile";
import { createProfile } from "../resolvers/userProfile/createProfile";

export const userProfileRouter = express.Router();

userProfileRouter.post("/", createProfile);
userProfileRouter.get("/", viewProfile);