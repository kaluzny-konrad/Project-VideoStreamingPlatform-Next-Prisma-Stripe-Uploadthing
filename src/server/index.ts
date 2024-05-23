import { router } from "./trpc";
import { orderRouter } from "./order-router";
import { courseRouter } from "./course-router";
import { adminRouter } from "./admin-router";
import { categoryRouter } from "./category-router";
import { videoRouter } from "./video-router";
import { userRouter } from "./user-router";
import { chapterRouter } from "./chapter-router";
import { reviewRouter } from "./review-router";
import { photoRouter } from "./photo-router";

export const appRouter = router({
  order: orderRouter,
  course: courseRouter,
  admin: adminRouter,
  category: categoryRouter,
  video: videoRouter,
  user: userRouter,
  chapter: chapterRouter,
  review: reviewRouter,
  photo: photoRouter,
});

export type AppRouter = typeof appRouter;
