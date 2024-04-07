import { z } from "zod";

export const CreateReviewValidator = z.object({
  courseId: z.string(),
  rating: z
  .string()
  .refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Rating must be a number",
  })
  .refine((val) => parseInt(val, 10) > 0, {
    message: "Rating must be greater than 0",
  })
  .refine((val) => parseInt(val, 10) < 5, {
    message: "Rating must be less or equal to 5",
  }),
  
  title: z.string().max(128).optional(),
  comment: z.string().max(1024).optional(),
});

export type CreateReviewRequest = z.infer<typeof CreateReviewValidator>;