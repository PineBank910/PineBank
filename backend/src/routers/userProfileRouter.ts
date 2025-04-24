import express from "express";
import { viewProfile } from "../resolvers/userProfile/getProfile";
import { createProfile } from "../resolvers/userProfile/createProfile";
import { validate } from "../middlewares/validate";
import { userProfileSchema } from "../validators/profileSchema";
import { authorizationMiddleware } from "../middlewares/authorization";

export const userProfileRouter = express.Router();

userProfileRouter.post("/", authorizationMiddleware, validate(userProfileSchema),createProfile);
userProfileRouter.get("/", authorizationMiddleware, viewProfile);