import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "../lib/stripe";
import { db } from "@/db";

export const productRouter = router({
  createCourse: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description, price, image } = input;
      const { user } = ctx;

      const stripeProduct = await stripe.products.create({
        name: name,
        default_price_data: {
          currency: "PLN",
          unit_amount: price,
        },
      });

      const product = await db.product.create({
        data: {
          name,
          price,
          description,
          image,
          priceId: stripeProduct.default_price as string,
          stripeProductId: stripeProduct.id,
        },
      });

      const course = await db.course.create({
        data: {
          Product: {
            connect: {
              id: product.id,
            },
          },
        },
        include: {
          Product: true,
        },
      });

      return course;
    }),

  addVideoToCourse: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
        videoId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId } = input;
      const { user } = ctx;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          Product: true,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      const video = await db.video.findUnique({
        where: {
          id: videoId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      const updatedCourse = await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          VideosIncluded: {
            connect: {
              id: videoId,
            },
          },
        },
        include: {
          Product: true,
        },
      });

      return updatedCourse;
    }),
});
