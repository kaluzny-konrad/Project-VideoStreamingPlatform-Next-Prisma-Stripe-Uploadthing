import { db } from "@/db";
import PaymentButton from "@/components/PaymentButton";

type Props = {};

export default async function page({}: Props) {
  const products = await db.product.findMany({
    include: {
      OrdersWithProduct: true,
      Course: true,
    },
  });
  const productIds = products.map((product) => product.id);

  return (
    <div>
      <h1>Stripe Payment Test</h1>
      <ul>
        {products.map((product) => (
          <li className="mt-8" key={product.id}>
            <p>Id: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: {Number(product.price)}</p>
            <p>Image: {product.image}</p>
            <p>priceId: {product.priceId}</p>
            <p>stripeProductId: {product.stripeProductId}</p>
            {product.OrdersWithProduct && (
              <>
                <p>
                  OrdersWithProduct:{" "}
                  {product.OrdersWithProduct.map((order) => (
                    <p key={order.id}>{order.id}</p>
                  ))}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
      {productIds.length > 0 ? (
        <div className="mt-8">
          <PaymentButton productIds={productIds} />
        </div>
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}
