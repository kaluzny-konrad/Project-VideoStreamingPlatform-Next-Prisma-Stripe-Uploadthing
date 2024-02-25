import { router } from "./trpc";
import { testRouter } from "./test-router";
import { orderRouter } from "./order-router";
import { courseRouter } from "./course-router";

export const appRouter = router({
  test: testRouter,
  order: orderRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;
