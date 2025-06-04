import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  profilePictureUrl: z.string().optional(),
  bio: z.string(),
  location: z.string(),
});

export const addTravelSchema = z.object({
  userId: z.string(),
  countryId: z.number(),
  cityId: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  dateTravel: z.date(),
  duration: z.number(),
});
