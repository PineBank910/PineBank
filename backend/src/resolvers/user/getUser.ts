import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { clerkClient, getAuth } from "@clerk/express";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {

    const { userId } = getAuth(req);

    if (!userId) {
      console.log("User ID is missing");
      res.status(400).json({ message: "User ID is missing from the token" });
      return
    }

    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("User ID from request:", userId);

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        userProfile: true,
        loans: true,
        accounts: true,
      },
    });

    if (!user) {
      console.log("User not found");
       res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);
     res.json({ message: "User data fetched successfully", user });
  } catch (err) {
    console.error("Error fetching user:", err);
     res.status(500).json({ message: "Error occurred while fetching user data" });
  }
};
