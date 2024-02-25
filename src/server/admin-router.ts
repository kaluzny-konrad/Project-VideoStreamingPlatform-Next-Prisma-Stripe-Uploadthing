import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";

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
});
