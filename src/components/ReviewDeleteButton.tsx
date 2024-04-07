"use client";

import { trpc } from "@/server/client";
import { Review } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = {
  reviewId: string;
  setUserReview: (review: Review | null) => void;
  initialReview: Review;
  optimisticUpdateLoading: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function ReviewDeleteButton({
  reviewId,
  setUserReview,
  initialReview,
  optimisticUpdateLoading,
  setOptimisticUpdateLoading,
}: Props) {
  const { mutate: deleteReview } = trpc.review.deleteReview.useMutation({
    onSuccess: () => {
      toast.success("Review deleted successfully");
      setUserReview(null);
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error);
      setUserReview(initialReview);
    },
    onSettled: () => {
      setOptimisticUpdateLoading(false);
    },
  });

  const handleOptimisticDelete = async () => {
    console.log("delete review", reviewId);

    setOptimisticUpdateLoading(true);
    setUserReview(null);
    deleteReview({ reviewId });
  };

  return (
    <Button onClick={handleOptimisticDelete} disabled={optimisticUpdateLoading} variant={'destructive'}>
      Delete review
    </Button>
  );
}
