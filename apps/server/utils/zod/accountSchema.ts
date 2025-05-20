import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.number(),
  profilePictureUrl: z.string(),
  bio: z.string(),
  location: z.string(),
});
