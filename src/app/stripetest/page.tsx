import { db } from "@/db";
import PaymentButton from "@/components/PaymentButton";

type Props = {};

export default async function page({}: Props) {
  const products = await db.product.findMany();
  const productIds = products.map((product) => product.id);
  console.log(productIds);

  return (
    <div>
      <h1>Stripe Payment Test</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      {productIds.length > 0 ? (
        <PaymentButton productIds={productIds} />
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}
