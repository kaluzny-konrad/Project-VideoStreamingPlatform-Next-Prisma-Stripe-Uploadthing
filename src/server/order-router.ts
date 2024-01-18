import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "../lib/stripe";
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

export const orderRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let { productIds } = input;
      const { user } = ctx;

      if (productIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const products = await db.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));

      if (filteredProducts.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      productIds = filteredProducts.map((prod) => prod.id);

      const order = await db.order.create({
        data: {
          userId: user.id,
          ProductsInOrder: {
            connect: productIds.map((id) => ({ id })),
          },
          total: filteredProducts.reduce((acc, curr) => {
            return acc + Number(curr.price); // ToDo: fix to decimal
          }, 0),
          currency: "usd", // ToDo: fix to dynamic
          status: OrderStatus.CREATED,
        },
      });

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: filteredProducts.map((prod) => ({
          price: prod.priceId,
          quantity: 1,
        })),
        mode: "payment",
        billing_address_collection: "auto",
        success_url: `${process.env.NEXT_PUBLIC_URL}/order/${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/order/${order.id}`,
      });

      return { url: stripeSession.url };
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
