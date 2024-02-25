import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "@/db";
import { CourseValidator } from "@/lib/validators/course";
import { stripe } from "../lib/stripe";
import {
  AddVideoValidator,
  DeleteVideoValidator,
} from "@/lib/validators/video";
import { utapi } from "./uploadthing";

export const courseRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany({});
    return courses;
  }),

  createCourse: privateProcedure
    .input(CourseValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, description, mainImageId } = input;
      const { user } = ctx;

      const price = parseInt(input.price, 10);

      const stripeProduct = await stripe.products.create({
        name: name,
        default_price_data: {
          currency: "PLN",
          unit_amount: price,
        },
      });

      const course = await db.course.create({
        data: {
          name,
          price,
          description,
          imageId: mainImageId,
          priceId: stripeProduct.default_price as string,
          stripeProductId: stripeProduct.id,
          creatorId: user.id,
        },
      });

      return course;
    }),

  addVideoToCourse: privateProcedure
    .input(AddVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId } = input;
      const { user } = ctx;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
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
      });

      return updatedCourse;
    }),

  deleteVideoFromCourse: privateProcedure
    .input(DeleteVideoValidator)
    .mutation(async ({ input, ctx }) => {
      const { courseId, videoId } = input;
      const { user } = ctx;

      // Ensure the course exists
      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      // Ensure the video exists
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

      // Update the course to disconnect the video
      const updatedCourse = await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          VideosIncluded: {
            disconnect: {
              id: videoId,
            },
          },
        },
      });

      // Check if there are any remaining courses with the deleted video
      const coursesWithDeletedVideo = await db.course.findMany({
        where: {
          VideosIncluded: {
            some: {
              id: videoId,
            },
          },
        },
      });

      // If no courses contain the deleted video, delete related files
      if (coursesWithDeletedVideo.length === 0) {
        utapi.deleteFiles(video.fileName);
      }

      return updatedCourse;
    }),
});
