import PaymentStatus from "@/components/PaymentStatus";
import { db } from "@/db";
import { Course, OrderStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    orderId: string;
  };
};

export default async function page({ params }: Props) {
  const { orderId } = params;

  // ToDo: check if is user order

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      CoursesInOrder: true,
    },
  });

  if (!order) {
    return notFound();
  }

  const products = order.CoursesInOrder as Course[];

  const orderTotal = products.reduce((acc, product) => {
    return acc + product.price;
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
