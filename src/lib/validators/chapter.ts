import { z } from "zod";

export const UpdateChapterIdsOrderValidator = z.object({
  courseId: z.string(),
  chaptersIdsOrder: z.array(z.string()),
});

export const CreateChapterValidator = z.object({
  courseId: z.string(),
  name: z
    .string()
    .min(3, { message: "Chapter name must be minimum 3 characters long" })
    .max(128, { message: "Chapter name must be at least 128 characters" }),
});

export const CreateSubChapterValidator = z.object({
  courseId: z.string(),
  chapterId: z.string(),
  name: z
    .string()
    .min(3, { message: "Subchapter name must be minimum 3 characters long" })
    .max(128, { message: "Subchapter name must be at least 128 characters" }),
});

export const UpdateChapterValidator = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Chapter name must be minimum 3 characters long" })
    .max(128, { message: "Chapter name must be at least 128 characters" }),
});

export const UpdateSubChapterIdsOrderValidator = z.object({
  chapterId: z.string(),
  subChaptersIdsOrder: z.array(z.string()),
});

export const MoveSubChapterValidator = z.object({
  moveSubChapterId: z.string(),
  removeChapterId: z.string(),
  addChapterId: z.string(),
  addChapterIdsOrder: z.array(z.string()),
});

export const UpdateSubChapterValidator = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Subchapter name must be minimum 3 characters long" })
    .max(128, { message: "Subchapter name must be at least 128 characters" }),
});

export const DeleteChapterValidator = z.object({
  id: z.string(),
});

export const DeleteSubChapterValidator = z.object({
  id: z.string(),
});

export type CreateChapterRequest = z.infer<typeof CreateChapterValidator>;
export type CreateSubChapterRequest = z.infer<typeof CreateSubChapterValidator>;

export type UpdateChapterRequest = z.infer<typeof UpdateChapterValidator>;
export type UpdateSubChapterRequest = z.infer<typeof UpdateSubChapterValidator>;
export type DeleteChapterRequest = z.infer<typeof DeleteChapterValidator>;
export type DeleteSubChapterRequest = z.infer<typeof DeleteSubChapterValidator>;

export type UpdateSubChapterIdsOrderRequest = z.infer<typeof UpdateSubChapterIdsOrderValidator>;
export type MoveSubChapterRequest = z.infer<typeof MoveSubChapterValidator>;