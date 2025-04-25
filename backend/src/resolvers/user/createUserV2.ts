import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export const CreateUserV2 = async (req: Request, res: Response) => {
  const password = "Clerk_deer_baigaa";

  const { id, email_addresses, username } = req.body.data;
  try {
    const user = await prisma.user.create({
      data: {
        email: email_addresses[0].email_address,
        username: username || null,
        password: password || null,
        clerkId: id,
      },
    });
    res.status(201).json({ message: "User synced", user });
  } catch (error) {
    res.status(500).json({ message: "Error syncing user.", error });
  }
};
