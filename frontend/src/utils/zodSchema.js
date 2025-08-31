import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(3),
  name: z.string().min(3),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
})

export const loginSchema = registerSchema.omit({
  name: true,
  password_confirmation: true
})