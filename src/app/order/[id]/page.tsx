import PaymentStatus from "@/components/PaymentStatus";
import { db } from "@/db";
import { OrderStatus, Product } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id } = params;

  // ToDo: check if is user order

  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      ProductsInOrder: true,
    },
  });

  if (!order) {
    return notFound();
  }

  const products = order.ProductsInOrder as Product[];

  const orderTotal = products.reduce((acc, product) => {
    return acc + Number(product.price); // ToDo: fix to decimal
  }, 0);

  const user = await db.user.findUnique({
    where: {
      id: order.userId,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>Order {order.id}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <p>Total: {orderTotal}</p>
      <PaymentStatus
        isPaid={order.status === OrderStatus.PAID}
        orderEmail={user.email || ""}
        orderId={order.id}
      />
    </div>
  );
}
