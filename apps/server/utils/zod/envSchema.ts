import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  WEBAPP_URL: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
