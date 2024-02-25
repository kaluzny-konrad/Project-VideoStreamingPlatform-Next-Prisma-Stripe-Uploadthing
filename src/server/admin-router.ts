import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { CategoryValidator } from "@/lib/validators/category";

export const adminRouter = router({
  deleteVideo: privateProcedure
    .input(
      z.object({
        videoId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { videoId } = input;

      await db.video.delete({
        where: {
          id: videoId,
        },
      });

      return true;
    }),

  deleteCourse: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { courseId } = input;

      await db.course.delete({
        where: {
          id: courseId,
        },
      });

      return true;
    }),

  deleteCategory: privateProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { categoryId } = input;

      await db.category.delete({
        where: {
          id: categoryId,
        },
      });

      return true;
    }),

  createCategory: privateProcedure
    .input(CategoryValidator)
    .mutation(async ({ input }) => {
      const category = await db.category.create({
        data: input,
      });

      return category;
    }),
});
