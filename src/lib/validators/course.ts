import { z } from "zod";

export const CourseCreateValidator = z.object({
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
  imageId: z.string().min(1, { message: "You need to upload a main image" }),
  categoryId: z.string().min(1, { message: "You need to select a category" }),
});

export const CourseEditValidator = z.object({
  courseId: z.string().min(1, { message: "Course id should be provided" }),
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
  imageId: z.string(),
  categoryId: z.string(),
});

export type CourseCreateRequest = z.infer<typeof CourseCreateValidator>;
export type CourseEditRequest = z.infer<typeof CourseEditValidator>;