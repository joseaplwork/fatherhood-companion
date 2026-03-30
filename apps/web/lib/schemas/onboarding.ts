import { z } from "zod";

export const ChildProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthYear: z.number().int().min(1990).max(new Date().getFullYear()),
});

export const OnboardingSchema = z.object({
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  interests: z.array(z.string()).max(10).optional(),
  children: z.array(ChildProfileSchema).min(0).max(10).optional(),
});

export type OnboardingInput = z.infer<typeof OnboardingSchema>;
