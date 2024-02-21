import { router } from "./trpc";
import { testRouter } from "./test-router";
import { orderRouter } from "./order-router";
import { productRouter } from "./product-router";
import { coursesRouter } from "./courses-router";

export const appRouter = router({
  test: testRouter,
  order: orderRouter,
  product: productRouter,
  courses: coursesRouter,
});

export type AppRouter = typeof appRouter;
