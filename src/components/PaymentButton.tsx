"use client";

import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";

type Props = {
  productIds: string[];
};

export default function PaymentButton({ productIds }: Props) {
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } =
    trpc.order.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  return (
    <button onClick={() => createCheckoutSession({ productIds })}>
      Buy something
    </button>
  );
}
