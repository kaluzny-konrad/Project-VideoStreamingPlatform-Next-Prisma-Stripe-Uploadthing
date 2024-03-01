import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { db } from "@/db";

export const userRouter = router({
  getOwnedCourses: privateProcedure.query(
    async ({ ctx }): Promise<string[]> => {
      const { user } = ctx;
      const userWithCourses = await db.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          CoursesOwnedByUser: true,
        },
      });
      if (!userWithCourses) return [];

      const ownedCoursesIds = userWithCourses.CoursesOwnedByUser.map(
        (course) => course.id
      );
      return ownedCoursesIds;
    }
  ),

  isCourseOwned: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<boolean> => {
      const { user } = ctx;
      const userWithCourses = await db.user.findUnique({
        where: {
          id: user.id,
        },
        include: {
          CoursesOwnedByUser: true,
        },
      });
      if (!userWithCourses) return false;

      const ownedCoursesIds = userWithCourses.CoursesOwnedByUser.map(
        (course) => course.id
      );
      return ownedCoursesIds.includes(input.courseId);
    }),
});
