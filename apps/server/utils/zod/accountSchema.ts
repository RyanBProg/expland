import { z } from "zod";

export const userProfileSchema = z.object({
  userId: z.string(),
  profilePictureUrl: z.string().optional(),
  bio: z.string(),
  location: z.string(),
});

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const addTravelSchema = z.object({
  userId: z.string(),
  countryId: z.number(),
  cityIds: z.array(z.number()),
  description: z.string().optional(),
  dateTravel: z
    .string()
    .refine(val => isoDateRegex.test(val) && !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform(val => new Date(val)),
  duration: z.number(),
});
