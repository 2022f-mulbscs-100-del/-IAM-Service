import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(["USER", "ADMIN", "SUPERADMIN"], {
    message: "Role must be either 'USER', 'ADMIN', or 'SUPERADMIN'",
  }),
});
