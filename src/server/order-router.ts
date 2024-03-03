import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "../lib/stripe";
import { db } from "@/db";
import { OrderStatus, Prisma } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";

export const orderRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        courseIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { courseIds } = input;
      const { user } = ctx;

      if (courseIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const courses = await db.course.findMany({
        where: {
          id: {
            in: courseIds,
          },
        },
      });

      const filteredCourses = courses.filter((prod) => Boolean(prod.priceId));

      if (filteredCourses.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      courseIds = filteredCourses.map((prod) => prod.id);

      const order = await db.order.create({
        data: {
          userId: user.id,
          CoursesInOrder: {
            connect: courseIds.map((id) => ({ id })),
          },
          total: new Prisma.Decimal(
            filteredCourses.reduce(
              (acc, curr) => acc.add(new Prisma.Decimal(curr.price)),
              new Prisma.Decimal(0)
            )
          ),
          currency: "PLN",
          status: OrderStatus.CREATED,
        },
      });

      try {
        const billingUrl = absoluteUrl(`/orders/${order.id}`);
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          billing_address_collection: "auto",
          line_items: filteredCourses.map((prod) => ({
            price: prod.priceId,
            quantity: 1,
          })),
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
        });

        console.log(stripeSession);

        return { url: stripeSession.url };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  pollOrderStatus: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { orderId } = input;
      const order = await db.order.findFirst({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return {
        status: order.status,
        isPaid: order.status === OrderStatus.PAID,
      };
    }),
});
