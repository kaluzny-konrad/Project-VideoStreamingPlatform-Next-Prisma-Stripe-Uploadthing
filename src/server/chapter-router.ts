import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import {
  CreateChapterValidator,
  CreateChaptersStateValidator,
  CreateSubChapterValidator,
  DeleteChapterValidator,
  DeleteSubChapterValidator,
  UpdateChapterIdsOrderValidator,
  UpdateChapterValidator,
  UpdateSubChapterIdsOrderValidator,
  UpdateSubChapterValidator,
} from "@/lib/validators/chapter";

export const chapterRouter = router({
  getChaptersState: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { courseId } = input;
      const { user } = ctx;

      const chaptersState = await db.chaptersState.findFirst({
        where: {
          courseId,
        },
        include: {
          Chapters: true,
          SubChapters: true,
        },
      });

      return chaptersState;
    }),

  createChaptersState: privateProcedure
    .input(CreateChaptersStateValidator)
    .mutation(async ({ input }) => {
      const chaptersState = await db.chaptersState.create({
        data: input,
      });
      return chaptersState;
    }),

  updateChapterIdsOrder: privateProcedure
    .input(UpdateChapterIdsOrderValidator)
    .mutation(async ({ input }) => {
      const chaptersState = await db.chaptersState.update({
        data: {
          Chapters: {
            set: input.chaptersIdsOrder.map((id, index) => ({
              id,
              order: index,
            })),
          },
        },
        where: {
          id: input.chaptersStateId,
        },
      });
      return chaptersState;
    }),

  createChapter: privateProcedure
    .input(CreateChapterValidator)
    .mutation(async ({ input }) => {
      const { chaptersStateId, name } = input;
      const chapter = await db.chapter.create({
        data: {
          chaptersStateId,
          name,
        },
      });

      const chaptersState = await db.chaptersState.update({
        data: {
          Chapters: {
            connect: {
              id: chapter.id,
            },
          },
          ChapterIdsOrder: {
            push: chapter.id,
          },
        },
        where: {
          id: chaptersStateId,
        },
      });

      return chapter;
    }),

  createSubChapter: privateProcedure
    .input(CreateSubChapterValidator)
    .mutation(async ({ input }) => {
      const { chaptersStateId, name, chapterId } = input;
      const subChapter = await db.subChapter.create({
        data: {
          chaptersStateId,
          name,
        },
      });

      await db.chaptersState.update({
        data: {
          SubChapters: {
            connect: {
              id: subChapter.id,
            },
          },
        },
        where: {
          id: chaptersStateId,
        },
      });

      await db.chapter.update({
        data: {
          SubChapterIdsOrder: {
            push: subChapter.id,
          },
        },
        where: {
          id: chapterId,
        },
      });

      return subChapter;
    }),

  updateChapter: privateProcedure
    .input(UpdateChapterValidator)
    .mutation(async ({ input }) => {
      const chapter = await db.chapter.update({
        data: input,
        where: {
          id: input.id,
        },
      });
      return chapter;
    }),

  updateSubCharterIdsOrder: privateProcedure
    .input(UpdateSubChapterIdsOrderValidator)
    .mutation(async ({ input }) => {
      const chaptersState = await db.chaptersState.update({
        data: {
          SubChapters: {
            set: input.subChaptersIdsOrder.map((id, index) => ({
              id,
              order: index,
            })),
          },
        },
        where: {
          id: input.chaptersStateId,
        },
      });
      return chaptersState;
    }),

  updateSubChapter: privateProcedure
    .input(UpdateSubChapterValidator)
    .mutation(async ({ input }) => {
      const subChapter = await db.subChapter.update({
        data: input,
        where: {
          id: input.id,
        },
      });
      return subChapter;
    }),

  deleteChapter: privateProcedure
    .input(DeleteChapterValidator)
    .mutation(async ({ input }) => {
      const { id } = input;

      const chapter = await db.chapter.delete({
        where: {
          id: id,
        },
      });

      const chaptersState = await db.chaptersState.findFirst({
        where: {
          id: chapter.chaptersStateId,
        },
        select: {
          ChapterIdsOrder: true,
        },
      });

      if (!chaptersState) {
        throw new Error("No chapters state");
      }

      const newChapterIdsOrder = chaptersState.ChapterIdsOrder.filter(
        (chapterId) => chapterId !== id
      );

      await db.chaptersState.update({
        data: {
          ChapterIdsOrder: {
            set: newChapterIdsOrder,
          },
        },
        where: {
          id: chapter.chaptersStateId,
        },
      });

      return chapter;
    }),

  deleteSubChapter: privateProcedure
    .input(DeleteSubChapterValidator)
    .mutation(async ({ input }) => {
      const subChapter = await db.subChapter.delete({
        where: {
          id: input.id,
        },
      });
      return subChapter;
    }),
});
