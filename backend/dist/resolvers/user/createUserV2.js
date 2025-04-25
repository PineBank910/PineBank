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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserV2 = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const CreateUserV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = "Clerk_deer_baigaa";
    const { id, email_addresses, username } = req.body.data;
    try {
        const user = yield prisma.user.create({
            data: {
                email: email_addresses[0].email_address,
                username: username || null,
                password: password || null,
                clerkId: id,
            },
        });
        res.status(201).json({ message: "User synced", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error syncing user.", error });
    }
});
exports.CreateUserV2 = CreateUserV2;
