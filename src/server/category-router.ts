import { db } from "@/db";
import { publicProcedure, router } from "./trpc";

export const categoryRouter = router({
  getCategories: publicProcedure.query(async () => {
    const categories = await db.category.findMany({});
    return categories;
  }),

  getActiveCategories: publicProcedure.query(async () => {
    const categories = await db.category.findMany({
      include: {
        Courses: {
          select: {
            id: true,
          },
        },
      },
    });

    return categories.filter(
      (category) => category.Courses.length > 0
    );
  }),
});
