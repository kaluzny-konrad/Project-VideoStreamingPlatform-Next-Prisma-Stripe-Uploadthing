import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";

import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";
import {
  CourseCreateValidator,
  CourseEditValidator,
} from "@/lib/validators/course";
import { stripe } from "@/lib/stripe";

export const courseRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany({
      include: {
        Reviews: true,
        Photos: true,
      },
    });

    return courses;
  }),

  getCoursesOwnedByUser: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const userDb = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        CoursesOwnedByUser: true,
      },
    });

    if (!userDb) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    const courses = await db.course.findMany({
      where: {
        id: {
          in: userDb.CoursesOwnedByUser.map((course) => course.id),
        },
      },
      include: {
        Reviews: true,
        Photos: true,
      },
    });

    return courses;
  }),

  getCourse: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { courseId } = input;

      const course = await db.course.findUnique({
        where: {
          id: courseId,
        },
        include: {
          Reviews: true,
          Photos: true,
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
      const { name, description, categoryId } = input;
      const { user } = ctx;

      const price = new Prisma.Decimal(input.price);
      const prismaPrice = parseFloat(input.price.replace(",", ".")) * 100;

      const stripeProduct = await stripe.products.create({
        name: name,
        default_price_data: {
          currency: "PLN",
          unit_amount: prismaPrice,
        },
      });

      const course = await db.course.create({
        data: {
          name,
          price,
          description,
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
      const { name, description, courseId, categoryId } = input;
      const { user } = ctx;

      const newPrice = new Prisma.Decimal(input.price);
      const newPrismaPrice = parseFloat(input.price.replace(",", ".")) * 100;

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

      const previousStripePrices = await stripe.prices.list({
        product: course.stripeProductId,
      });

      let defaultPrice = previousStripePrices.data.find(
        (price) =>
          price.unit_amount === newPrismaPrice && price.currency === "pln"
      );

      if (!defaultPrice) {
        defaultPrice = await stripe.prices.create({
          currency: "PLN",
          unit_amount: newPrismaPrice,
          product: course.stripeProductId,
        });
      }

      const stripeProduct = await stripe.products.update(
        course.stripeProductId,
        {
          name: name,
          default_price: defaultPrice.id,
        }
      );

      const updatedCourse = await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          name,
          price: newPrice,
          description,
          priceId: stripeProduct.default_price as string,
          stripeProductId: stripeProduct.id,
          categoryId,
        },
      });

      return updatedCourse;
    }),
});
