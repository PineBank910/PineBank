import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        clerkId?: string;
      };
    }
  }
}

const prisma = new PrismaClient();

export const clerkAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.decode(token) as any;

    if (!decoded) {
      res.status(401).json({ message: "Invalid token" });
    }

    const clerkId = decoded.sub;

    if (!clerkId) {
      res.status(401).json({ message: "No sub in token" });
    }

    // 🔥 Find your user
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found in backend" });
      return;
    }

    // ✅ Attach user information
    req.user = {
      id: user.id.toString(), // make sure it's a string
      email: user.email,
      clerkId: user.clerkId ?? undefined,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
