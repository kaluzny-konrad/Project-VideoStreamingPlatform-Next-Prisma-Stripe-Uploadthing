import { z } from "zod";

export const ConnectVideoWithCourseValidator = z.object({
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
  subChapterId: z.string().min(1, { message: "You need to provide a subchapter id" }),
});

export const DeleteVideoValidator = z.object({
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
  subChapterId: z.string().min(1, { message: "You need to provide a subchapter id" }),
});

export const VideoEditValidator = z.object({
  videoId: z.string().min(1, { message: "You need to provide a video id" }),
  subChapterId: z.string().min(1, { message: "You need to provide a subchapter id" }),
  name: z.string().min(1, { message: "You need to provide a name" }),
});

export type AddVideoRequest = z.infer<typeof ConnectVideoWithCourseValidator>;
export type DeleteVideoRequest = z.infer<typeof DeleteVideoValidator>;
export type VideoEditRequest = z.infer<typeof VideoEditValidator>;