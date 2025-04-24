import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routers/userRouter";
import { accountRouter } from "./routers/bankAccountRouter";
// import { donationRouter } from "./routers/donationRouter";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;
dotenv.config();

const prisma =new PrismaClient()

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/users", userRouter);
app.use("/account", accountRouter);
// app.use("/donation", donationRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
