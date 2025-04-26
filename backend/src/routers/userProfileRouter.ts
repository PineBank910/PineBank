import express from "express";
import { createProfile } from "../resolvers/userProfile/createProfile";
import { validate } from "../middlewares/validate";
import { userProfileSchema } from "../validators/profileSchema";
import { authorizationMiddleware } from "../middlewares/authorization";
import { updateProfile } from "../resolvers/userProfile/updateProfile";
import { viewProfile } from "../resolvers/userProfile/getProfile";

export const userProfileRouter = express.Router();

userProfileRouter.post("/", authorizationMiddleware, validate(userProfileSchema), createProfile);
userProfileRouter.put("/:id", authorizationMiddleware, validate(userProfileSchema), updateProfile);
userProfileRouter.get("/", authorizationMiddleware, viewProfile);