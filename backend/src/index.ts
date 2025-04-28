import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routers/userRouter";
import { accountRouter } from "./routers/bankAccountRouter";
import { userProfileRouter } from "./routers/userProfileRouter";
import { transactionRouter } from "./routers/transactionRouter";
import { cardRouter } from "./routers/cardRouter";
import { loanRouter } from "./routers/loanRouter";
import { clerkMiddleware } from '@clerk/express'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT

const prisma =new PrismaClient()
console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
app.use(clerkMiddleware())

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/users", userRouter);
app.use("/account", accountRouter);
app.use("/profile", userProfileRouter)
app.use("/transaction", transactionRouter)
app.use("/card", cardRouter)
app.use("/loan", loanRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
