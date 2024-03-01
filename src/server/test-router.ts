import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const testRouter = router({
  getTest: publicProcedure.query(async () => {
    return "Test text from trpc server";
  }),
  getPrivateTest: privateProcedure.query(async () => {
    return "Test text from trpc server";
  }),
  createCheckoutSession: privateProcedure
    .input(
      z.object({
        courseId: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("ctx", ctx);
      console.log("input", input);
      await db.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          CoursesOwnedByUser: {
            connect: input.courseId.map((id) => ({ id })),
          },
        },
      });
    }),
});
