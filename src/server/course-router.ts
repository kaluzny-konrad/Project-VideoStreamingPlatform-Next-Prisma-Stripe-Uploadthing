import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import {
  CourseCreateValidator,
  CourseEditValidator,
} from "@/lib/validators/course";
import { stripe } from "../lib/stripe";
import {
  AddVideoValidator,
  DeleteVideoValidator,
} from "@/lib/validators/video";
import { utapi } from "./uploadthing";
import { CourseOnList } from "@/types/course";
import { formatTimeToNow, shrinkDescription } from "@/lib/utils";
import { z } from "zod";

export const courseRouter = router({
  getCoursesListView: publicProcedure.query(async () => {
    const courses = await db.course.findMany({});
    const images = await db.image.findMany({
      where: {
        id: {
          in: courses.map((course) => course.imageId),
        },
      },
    });

    const coursesOnList = courses.map((course) => {
      const image = images.find((image) => image.id === course.imageId);
      const courseOnList: CourseOnList = {
        id: course.id,
        name: course.name,
        description: shrinkDescription(course.description, 120),
        price: course.price,
        imageUrl: image?.url || "",
        publicatedAt: formatTimeToNow(new Date()), // ToDo: add publicatedAt to the course
      };
      return courseOnList;
    });

    return coursesOnList;
  }),

  getCourse: privateProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { courseId } = input;
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

      return course;
    }),

  createCourse: privateProcedure
    .input(CourseCreateValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, description, imageId, categoryId} = input;
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
          imageId,
          priceId: stripeProduct.default_price as string,
          stripeProductId: stripeProduct.id,
          creatorId: user.id,
          categoryId,
        },
      });

      return course;
    }),

  editCourse: privateProcedure
    .input(CourseEditValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, description, imageId, courseId, categoryId } = input;
      const { user } = ctx;

      const price = parseInt(input.price, 10);

      const stripeProduct = await stripe.products.update(courseId, {
        name: name,
        // ToDo: update price
      });

      const course = await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          name,
          price,
          description,
          imageId,
          priceId: stripeProduct.default_price as string,
          stripeProductId: stripeProduct.id,
          categoryId,
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
          courseId: courseId,
        },
      });

      if (!video) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video not found",
        });
      }

      await db.video.delete({
        where: {
          id: videoId,
        },
      });

      utapi.deleteFiles(video.fileName);

      const updatedCourse = await db.course.findUnique({
        where: {
          id: courseId,
        },
      });

      return updatedCourse;
    }),
});
