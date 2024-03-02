"use client";

import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  stripeProductId: string;
  courseId: string;
};

export default function CourseCheckoutButton({
  stripeProductId,
  courseId,
}: Props) {
  const router = useRouter();

  const { mutate: createCheckoutSession } =
    trpc.test.createCheckoutSession.useMutation({
      onSuccess: () => {
        toast.success("Checkout session created");
        router.push(`${courseId}/watch`);
      },
    });

  function handleCourseCheckout() {
    const courseIdArray = [courseId];
    createCheckoutSession({ courseId: courseIdArray });
  }

  return (
    <Button onClick={handleCourseCheckout} variant={"destructive"}>
      CourseCheckoutButton
    </Button>
  );
}
