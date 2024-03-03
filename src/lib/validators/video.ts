import { z } from "zod";

export const AddVideoValidator = z.object({
  courseId: z.string().min(1, { message: "You need to provide a course id" }),
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
});

export const DeleteVideoValidator = z.object({
  courseId: z.string().min(1, { message: "You need to provide a course id" }),
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
});

export const VideoEditValidator = z.object({
  courseId: z.string().min(1, { message: "You need to provide a course id" }),
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
  name: z.string().min(1, { message: "You need to provide a name" }),
});

export type AddVideoRequest = z.infer<typeof AddVideoValidator>;
export type DeleteVideoRequest = z.infer<typeof DeleteVideoValidator>;
export type VideoEditRequest = z.infer<typeof VideoEditValidator>;