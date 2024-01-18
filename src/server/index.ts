import { router } from "./trpc";
import { testRouter } from "./test-router";

export const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
