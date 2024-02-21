import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "@/db";

export const coursesRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany({
      include: {
        Product: true,
      },
    });
    return courses;
  }),
});
