import { z } from "zod";

export const PhotoDeleteValidator = z.object({
  id: z.string().min(1, { message: "Photo id should be provided" }),
});

export const PhotoAddToCourseValidator = z.object({
  courseId: z.string().min(1, { message: "Course id should be provided" }),
  photoId: z.string().min(1, { message: "Photo id should be provided" }),
});

export type PhotoDeleteRequest = z.infer<typeof PhotoDeleteValidator>;
export type PhotoAddToCourseRequest = z.infer<typeof PhotoAddToCourseValidator>;