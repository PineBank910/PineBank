import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { firstName, lastName, userId, address, phone, image } = req.body;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: userId },
    });

    if (existingProfile) {
      return res.json({ message: "Profile is already existed" });
    }

    const profile = await prisma.userProfile.create({
      data: {
        firstName,
        lastName,
        address,
        phone,
        image,
        user: {
          connect: { id: userId }, // Connect the profile to the user
        },
      },
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "Profile creation failed",
    });
  }
};
