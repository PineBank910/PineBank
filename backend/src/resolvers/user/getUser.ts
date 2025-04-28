import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    console.log("User ID from request:", userId); // Log the userId to check if it's coming through

    if (!userId) {
      console.log("User ID is missing"); // Log if there's no userId
      return res
        .status(400)
        .json({ message: "User ID is missing from the token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProfile: true,
        loans: true,
        accounts: true,
      },
    });

    if (!user) {
      console.log("User not found"); // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // Log the user data
    return res.json({ message: "User data fetched successfully", user });
  } catch (err) {
    console.error("Error fetching user:", err); // Log error details
    return res
      .status(500)
      .json({ message: "Error occurred while fetching user data" });
  }
};
