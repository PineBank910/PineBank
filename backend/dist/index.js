"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const userRouter_1 = require("./routers/userRouter");
const bankAccountRouter_1 = require("./routers/bankAccountRouter");
const userProfileRouter_1 = require("./routers/userProfileRouter");
const transactionRouter_1 = require("./routers/transactionRouter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 8000;
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
app.use("/users", userRouter_1.userRouter);
app.use("/account", bankAccountRouter_1.accountRouter);
app.use("/profile", userProfileRouter_1.userProfileRouter);
app.use("/transaction", transactionRouter_1.transactionRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
