import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  profilePictureUrl: z.string(),
  bio: z.string(),
  location: z.string(),
});
