import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { Product } from "@prisma/client";
import React from "react";

type Props = {
  productId: string;
};

export default async function PaymentConnectToStripeProductButton({
  productId,
}: Props) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const handleCreateStripeProduct = () => async () => {
    const createdProduct = await stripe.products.create({
      name: product?.name!,
      default_price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(product?.price!) * 100),
      },
    });

    const updated: Product = {
      ...product,
      priceId: createdProduct.default_price as string,
      stripeProductId: createdProduct.id,
    };

    return updated;
  };

  return (
    <button onClick={handleCreateStripeProduct}>
      Create Stripe connection
    </button>
  );
}
