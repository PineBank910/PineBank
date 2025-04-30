import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
const prisma = new PrismaClient();
export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.data;

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating user.", error });
    console.log("Error:", error);
  }
};
