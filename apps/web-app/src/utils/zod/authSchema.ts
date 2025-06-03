import { z } from "zod";

export const nameSchema = z
  .string()
  .min(1, "Full Name must be 1 character or more")
  .max(50, "Full Name must be 50 characters or less")
  .trim()
  .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
  .toLowerCase();

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be less than 20 characters")
  .trim()
  .regex(
    /^[a-zA-Z0-9_\-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens",
  )
  .toLowerCase();

export const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be less than 100 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one uppercase letter, one lowercase letter and one number",
  );

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address").toLowerCase(),
    username: usernameSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    givenName: nameSchema,
    familyName: nameSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
