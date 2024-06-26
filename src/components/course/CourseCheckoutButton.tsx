"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { trpc } from "@/server/client";

import { Button } from "@/components/ui/button";

type Props = {
  courseId: string;
};

export default function CourseCheckoutButton({
  courseId,
}: Props) {
  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.order.createSession.useMutation({
      onSuccess: ({ url }) => {
        toast.success("Order created");
        if (url) router.push(url);
      },
    });

  function handleCourseCheckout() {
    const courseIdArray = [courseId];
    createCheckoutSession({ courseIds: courseIdArray });
  }

  return (
    <Button onClick={handleCourseCheckout}
      data-test="course-checkout-button"
    >
      Buy now
    </Button>
  );
}
