import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routers/userRouter";
import { accountRouter } from "./routers/bankAccountRouter";
import { userProfileRouter } from "./routers/userProfileRouter";
import { transactionRouter } from "./routers/transactionRouter";
import { clerkMiddleware } from "@clerk/express";
import { designRouter } from "./routers/designRouter";

dotenv.config();
const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
const port = process.env.PORT;

app.use(clerkMiddleware());

app.use("/users", userRouter);
app.use("/account", accountRouter);
app.use("/profile", userProfileRouter);
app.use("/transaction", transactionRouter);
app.use("/design", designRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
