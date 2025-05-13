import express from "express";
import { createDesign } from "../resolvers/designUser/createDesign";

export const designRouter = express.Router();

designRouter.post("/", createDesign);
