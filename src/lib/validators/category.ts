import { z } from "zod";

export const CategoryValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Title must be minimum 3 characters long" })
    .max(128, { message: "Title must be at least 128 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be minimum 3 characters long" })
    .max(128, { message: "Slug must be at least 128 characters" })
    .refine((val) => /^[a-z0-9-]+$/.test(val), {
      message: "Slug must be lowercase, alphanumeric and hyphenated",
    }),
});

export type CategoryCreationRequest = z.infer<typeof CategoryValidator>;
