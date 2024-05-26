import { z } from "zod";

import { db } from "@/db";
import { privateProcedure, router } from "./trpc";
import {
  CreateChapterValidator,
  CreateSubChapterValidator,
  DeleteChapterValidator,
  DeleteSubChapterValidator,
  GetChaptersStateValidator,
  MoveSubChapterValidator,
  UpdateChapterIdsOrderValidator,
  UpdateChapterValidator,
  UpdateSubChapterIdsOrderValidator,
  UpdateSubChapterValidator,
} from "@/lib/validators/chapter";

export const chapterRouter = router({
  getChaptersState: privateProcedure
    .input(GetChaptersStateValidator)
    .query(async ({ input }) => {
      const { courseId } = input;

      const course = await db.course.findFirst({
        where: {
          id: courseId,
        },
        include: {
          Chapters: true,
          SubChapters: true,
        }
      });

      if (!course) {
        throw new Error("No chapters state");
      }

      return course;
    }),

  createChapter: privateProcedure
    .input(CreateChapterValidator)
    .mutation(async ({ input }) => {
      const { courseId, name } = input;
      const chapter = await db.chapter.create({
        data: {
          courseId,
          name,
        },
      });

      return chapter;
    }),

  deleteChapter: privateProcedure
    .input(DeleteChapterValidator)
    .mutation(async ({ input }) => {
      const { id } = input;

      const chapterToDelete = await db.chapter.findFirst({
        where: {
          id: id,
        },
      });

      if (!chapterToDelete) {
        throw new Error("No chapter found");
      }

      const chapter = await db.chapter.delete({
        where: {
          id: id,
        },
      });

      const course = await db.course.findFirst({
        where: {
          id: chapter.courseId,
        },
        select: {
          ChapterIdsOrder: true,
        },
      });

      if (!course) {
        throw new Error("No chapters state");
      }

      const newChapterIdsOrder = course.ChapterIdsOrder.filter(
        (chapterId) => chapterId !== id
      );

      await db.course.update({
        data: {
          ChapterIdsOrder: {
            set: newChapterIdsOrder,
          },
        },
        where: {
          id: chapter.courseId,
        },
      });

      return chapter;
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

  updateChapterIdsOrder: privateProcedure
    .input(UpdateChapterIdsOrderValidator)
    .mutation(async ({ input }) => {
      const { courseId, chaptersIdsOrder } = input;

      const course = await db.course.update({
        data: {
          ChapterIdsOrder: chaptersIdsOrder,
        },
        where: {
          id: courseId,
        },
      });

      return course;
    }),

  createSubChapter: privateProcedure
    .input(CreateSubChapterValidator)
    .mutation(async ({ input }) => {
      const { courseId, name, chapterId } = input;
      const subChapter = await db.subChapter.create({
        data: {
          courseId,
          name,
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

  updateSubChapterIdsOrder: privateProcedure
    .input(UpdateSubChapterIdsOrderValidator)
    .mutation(async ({ input }) => {
      const { chapterId, subChaptersIdsOrder } = input;

      const chapter = await db.chapter.update({
        data: {
          SubChapterIdsOrder: subChaptersIdsOrder,
        },
        where: {
          id: chapterId,
        },
      });

      return chapter;
    }),

  moveSubChapter: privateProcedure
    .input(MoveSubChapterValidator)
    .mutation(async ({ input }) => {
      const {
        moveSubChapterId,
        removeChapterId,
        addChapterId,
        addChapterIdsOrder,
      } = input;

      const removeChapterBefore = await db.chapter.findFirst({
        where: {
          id: removeChapterId,
        },
        select: {
          SubChapterIdsOrder: true,
        },
      });

      if (!removeChapterBefore) {
        throw new Error("No chapter found");
      }

      const removeChapterIdsOrder =
        removeChapterBefore?.SubChapterIdsOrder.filter(
          (subChapterId) => subChapterId !== moveSubChapterId
        );

      await db.chapter.update({
        data: {
          SubChapterIdsOrder: removeChapterIdsOrder,
        },
        where: {
          id: removeChapterId,
        },
      });

      const addChapter = await db.chapter.update({
        data: {
          SubChapterIdsOrder: {
            set: addChapterIdsOrder,
          },
        },
        where: {
          id: addChapterId,
        },
      });

      return addChapter;
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
});
