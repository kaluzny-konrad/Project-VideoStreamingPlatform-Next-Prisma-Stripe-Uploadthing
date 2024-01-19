import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "../lib/stripe";
import { db } from "@/db";
import { OrderStatus } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";

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
            return acc + curr.price;
          }, 0),
          currency: "PLN",
          status: OrderStatus.CREATED,
        },
      });

      try {
        const billingUrl = absoluteUrl(`/order/${order.id}`);
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          billing_address_collection: "auto",
          line_items: filteredProducts.map((prod) => ({
            price: prod.priceId,
            quantity: 1,
          })),
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
        });

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
