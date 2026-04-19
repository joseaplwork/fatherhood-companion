import { z } from "zod";
import { RESOURCE_CATEGORY_VALUES } from "@/grove-companion/domain";

/** MM-YYYY regex — e.g. "03-2021" */
const BIRTH_DATE_REGEX = /^(0[1-9]|1[0-2])-\d{4}$/;

export const ChildProfileSchema = z.object({
  nickname: z.string().min(1, "Name is required").max(50),
  /** MM-YYYY, e.g. "03-2021" */
  birthDate: z.string().regex(BIRTH_DATE_REGEX, "Birth date must be MM-YYYY (e.g. 03-2021)"),
});

export const OnboardingSchema = z.object({
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  children: z.array(ChildProfileSchema).max(10).optional(),
  interests: z.array(z.enum(RESOURCE_CATEGORY_VALUES)).optional(),
});

export type OnboardingInput = z.infer<typeof OnboardingSchema>;
