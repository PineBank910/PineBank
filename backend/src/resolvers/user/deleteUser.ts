import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
const prisma = new PrismaClient();
export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.data;
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user.", error });
    console.log("Error:", error);
  }
};
