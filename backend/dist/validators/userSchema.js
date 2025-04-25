"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSignupSchema = void 0;
// src/validators/userSchemas.ts
const zod_1 = require("zod");
exports.userSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
    transactionPassword: zod_1.z.string().min(6),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    username: zod_1.z.string().min(3).optional(),
    password: zod_1.z.string().min(6),
}).refine(data => data.email || data.username, {
    message: "Either email or username is required",
    path: ["email", "username"]
});
