import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .length(8, "Phone number must be exactly 8 digits")
    .regex(/^\d{8}$/, "Phone number must contain only numbers"),
  image: z.string().url("Image must be a valid URL"),
});
