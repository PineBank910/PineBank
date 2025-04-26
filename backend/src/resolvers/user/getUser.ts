import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;


    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
        include: {
            userProfile: true,
            loans: true,
            accounts: true,
        },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User data fetched successfully", user });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occurred while fetching user data" });
  }
};
