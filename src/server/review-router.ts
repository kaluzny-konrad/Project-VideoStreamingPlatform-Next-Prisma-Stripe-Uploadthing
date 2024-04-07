import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { ReviewsOnCourse } from "@/types/review";
import { CreateReviewValidator } from "@/lib/validators/review";

export const reviewRouter = router({
  getReviewsOnCourse: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { courseId } = input;
      const { user } = ctx;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const reviews = await db.review.findMany({
        where: {
          courseId,
        },
      });

      const userReview = reviews.find((review) => review.userId === user.id);

      const reviewsOnCourse: ReviewsOnCourse = {
        userReviewId: userReview?.id,
        reviews,
      };

      return reviewsOnCourse;
    }),

  createReview: privateProcedure
    .input(CreateReviewValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, rating, title, comment } = input;
      const { user } = ctx;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const ratingNumber = parseInt(rating, 10);

      await db.review.create({
        data: {
          courseId,
          rating: ratingNumber,
          title,
          comment,
          userId: user.id,
        },
      });

      return;
    }),
});
