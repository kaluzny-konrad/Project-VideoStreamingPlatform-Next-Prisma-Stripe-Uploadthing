import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const creatorRouter = router({
  getCreator: publicProcedure
    .input(
      z.object({
        creatorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { creatorId } = input;

      const creator = await db.user.findUnique({
        where: {
          id: creatorId,
        },
      });

      if (!creator) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Creator not found",
        });
      }

      return creator;
    }),

    

  getCourses: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const courses = await db.course.findMany({
      where: {
        creatorId: user.id,
      },
      include: {
        Reviews: true,
        Photos: true,
      },
    });

    return courses;
  }),
});
