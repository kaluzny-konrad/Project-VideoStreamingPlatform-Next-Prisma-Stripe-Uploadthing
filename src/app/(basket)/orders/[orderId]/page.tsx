import OrderInfo from "@/components/order/OrderInfo";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";
import { getUserEmail } from "@/lib/session-emails";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    orderId: string;
  };
};

export default async function BasketOrderPage({ params }: Props) {
  const { orderId } = params;
  const user = await currentUser();

  return (
    <WrapperMaxWidth>
      <h1>Order</h1>
      <OrderInfo orderId={orderId} userEmail={getUserEmail(user)} />
    </WrapperMaxWidth>
  );
}
