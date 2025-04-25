"use strict";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import { Request, Response } from "express";
// const prisma = new PrismaClient();
// export const createUser = async (req: Request, res: Response) => {
//   const { username, email, password, transactionPassword } = req.body;
//   try {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const encryptedPasswordForUser = await bcrypt.hash(password, salt);
//     const encryptedPasswordForTransaction = await bcrypt.hash(
//       transactionPassword,
//       10
//     );
//     const user = {
//       email,
//       username,
//       password: encryptedPasswordForUser,
//       transactionPassword: encryptedPasswordForTransaction,
//     };
//     const createdUser = await prisma.user.create({ data: user });
//     res.json({
//       message: "success",
//       user: createdUser,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(403).json({ message: "Error occurred" });
//   }
// };
