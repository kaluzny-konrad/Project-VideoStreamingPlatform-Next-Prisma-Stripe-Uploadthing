import { router } from "./trpc";
import { testRouter } from "./test-router";
import { orderRouter } from "./order-router";
import { productRouter } from "./product-router";

export const appRouter = router({
  test: testRouter,
  order: orderRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
