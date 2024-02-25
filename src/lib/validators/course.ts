import { z } from "zod";

export const CourseValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Title must be minimum 3 characters long" })
    .max(128, { message: "Title must be at least 128 characters" }),
  description: z.string(),
  price: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Price must be a number",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "Price must be greater than 0",
    }),
  mainImageId: z
    .string()
    .min(1, { message: "You need to upload a main image" }),
});

export type CourseCreationRequest = z.infer<typeof CourseValidator>;
