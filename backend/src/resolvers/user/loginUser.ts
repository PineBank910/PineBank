// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const login = async (req: any, res: any) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       include: {
//         userProfile: true,
//       },
//     });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Email or password is incorrect" });
//     }

//     const passwordMatch = bcrypt.compareSync(password, user.password);
//     if (!passwordMatch) {
//       return res
//         .status(400)
//         .json({ message: "Email or password is incorrect" });
//     }

//     const token = jwt.sign({ id: user.id }, "logically impossible", {
//       expiresIn: "10min",
//     });

//     res.status(200).json({
//       token,
//       userId: user.id,
//       profileExists: !!user.userProfile,
//       message: "Login successful",
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };
