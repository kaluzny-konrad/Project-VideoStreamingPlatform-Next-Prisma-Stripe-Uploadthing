import { z } from "zod";

export const CreateChaptersStateValidator = z.object({
  courseId: z.string(),
});

export const UpdateChapterIdsOrderValidator = z.object({
  chaptersStateId: z.string(),
  chaptersIdsOrder: z.array(z.string()),
});

export const CreateChapterValidator = z.object({
  chaptersStateId: z.string(),
  name: z
    .string()
    .min(3, { message: "Chapter name must be minimum 3 characters long" })
    .max(128, { message: "Chapter name must be at least 128 characters" }),
});

export const CreateSubChapterValidator = z.object({
  chaptersStateId: z.string(),
  name: z
    .string()
    .min(3, { message: "Subchapter name must be minimum 3 characters long" })
    .max(128, { message: "Subchapter name must be at least 128 characters" }),
  chapterId: z.string(),
});

export const UpdateChapterValidator = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: "Chapter name must be minimum 3 characters long" })
    .max(128, { message: "Chapter name must be at least 128 characters" }),
});

export const UpdateSubChapterIdsOrderValidator = z.object({
  chaptersStateId: z.string(),
  subChaptersIdsOrder: z.array(z.string()),
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
export type CreateChaptersStateRequest = z.infer<
  typeof CreateChaptersStateValidator
>;
export type UpdateChapterRequest = z.infer<typeof UpdateChapterValidator>;
export type UpdateSubChapterRequest = z.infer<typeof UpdateSubChapterValidator>;
export type DeleteChapterRequest = z.infer<typeof DeleteChapterValidator>;
export type DeleteSubChapterRequest = z.infer<typeof DeleteSubChapterValidator>;
