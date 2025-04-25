"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = void 0;
const zod_1 = require("zod");
exports.userProfileSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    address: zod_1.z.string().min(1, "Address is required"),
    phone: zod_1.z
        .string()
        .length(8, "Phone number must be exactly 8 digits")
        .regex(/^\d{8}$/, "Phone number must contain only numbers"),
    image: zod_1.z.string().url("Image must be a valid URL"),
});
