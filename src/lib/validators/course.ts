import { z } from "zod";

export const CourseValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Title must be minimum 3 characters long" })
    .max(128, { message: "Title must be at least 128 characters" }),
  description: z.string(),
  price: z.number().positive(),
  image: z.string(),
});

export type CourseCreationRequest = z.infer<typeof CourseValidator>;
