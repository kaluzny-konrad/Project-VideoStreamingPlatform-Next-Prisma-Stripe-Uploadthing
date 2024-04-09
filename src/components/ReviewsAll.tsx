"use client";

import { trpc } from "@/server/client";
import { Skeleton } from "./ui/skeleton";
import ReviewBox from "./ReviewBox";

type Props = {
  courseId: string;
};

export default function ReviewsAll({ courseId }: Props) {
  const {
    data: reviews,
    error,
    isLoading,
  } = trpc.review.getAllReviews.useQuery({ courseId });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mb-4">
        <p className="font-bold text-slate-600">Reviews</p>
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold text-slate-600">Reviews</p>
      <div className="flex flex-col items-center justify-between gap-4 my-4 border-gray-200">
        {reviews?.map((review) => (
          <ReviewBox key={review.id} review={review} user={review.user} />
        ))}
      </div>
    </div>
  );
}
