import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty("Таны нэр оруулна уу")
    .min(2, "Нэр хамгийн багадаа 2 оронтой байх ёстой"),
  lastName: z
    .string()
    .nonempty("Таны овог оруулна уу")
    .min(2, "Овог хамгийн багадаа 2 оронтой байх ёстой"),
  phone: z
    .string()
    .nonempty("Утасны дугаараа оруулна уу")
    .min(8, "Утасны дугаар 8 оронтой байх ёстой")
    .max(8, "Утасны дугаар 8 оронтой байх ёстой")
    .regex(/^\d+$/, "Утасны дугаар зөвхөн тооноос бүрдэх ёстой"), 
  adress: z
    .string()
    .nonempty("Хаягаа оруулна уу"),
  image: z.string().url("Зурагны URL зөв байх ёстой").optional(),
});

