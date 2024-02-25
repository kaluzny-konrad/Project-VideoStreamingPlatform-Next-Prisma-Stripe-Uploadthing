import { router } from "./trpc";
import { testRouter } from "./test-router";
import { orderRouter } from "./order-router";
import { courseRouter } from "./course-router";
import { adminRouter } from "./admin-router";
import { categoryRouter } from "./category-router";

export const appRouter = router({
  test: testRouter,
  order: orderRouter,
  course: courseRouter,
  admin: adminRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
