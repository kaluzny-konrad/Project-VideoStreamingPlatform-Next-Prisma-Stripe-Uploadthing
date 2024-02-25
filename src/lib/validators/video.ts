import { z } from "zod";

export const AddVideoValidator = z.object({
  courseId: z.string().min(1, { message: "You need to provide a course id" }),
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
});

export const DeleteVideoValidator = z.object({
  courseId: z.string().min(1, { message: "You need to provide a course id" }),
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
});

export type AddVideoRequest = z.infer<typeof AddVideoValidator>;
export type DeleteVideoRequest = z.infer<typeof DeleteVideoValidator>;
