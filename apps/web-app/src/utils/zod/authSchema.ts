import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name must be 1 character or more")
  .max(30, "Name must be 30 characters or less")
  .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
  .toLowerCase();

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be less than 30 characters")
  .regex(
    /^[a-zA-Z0-9_\-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens",
  )
  .toLowerCase();

export const strongPasswordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password must be less than 50 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one uppercase letter, one lowercase letter and one number",
  );

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .max(64, "Email must be 64 characters or less")
      .toLowerCase(),
    username: usernameSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().trim(),
    givenName: nameSchema,
    familyName: nameSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(64, "Email must be 64 characters or less")
    .toLowerCase(),
  password: z.string(),
});
