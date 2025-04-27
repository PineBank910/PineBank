import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

type Token = {
  userId: string;
  email: string;
  password: string;
  id: string;
};

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token missing or malformed" });
  }

  try {
    const decoded = jwt.verify(token, "logically impossible") as Token;
    console.log("Decoded token:", decoded); // Log the decoded token

    if (decoded && decoded.id) {
      req.user = { id: decoded.id };
      console.log("User ID set in request:", req.user.id); // Log the user ID
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Error decoding token:", err); // Log the decoding error
    res.status(401).json({ message: "Invalid token" });
  }
};
