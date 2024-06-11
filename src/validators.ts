import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    contactPhone: z.string(),
    phoneVerified: z.boolean(),
    email: z.string(),
    emailVerified: z.boolean(),
    confirmationCode: z.string(),
    password: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})