"use client";

import { trpc } from "@/server/client";
import { Skeleton } from "./ui/skeleton";
import ReviewBox from "./ReviewBox";

type Props = {
  courseId: string;
};

export default function ReviewsOtherUsers({ courseId }: Props) {
  const {
    data: otherUsersReviews,
    error,
    isLoading,
  } = trpc.review.getOtherUsersReviews.useQuery({ courseId });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="font-bold text-slate-600">Other Reviews</h2>
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-slate-600">Other Reviews</h2>
      <div className="p-4 my-4 border-b border-gray-200 gap-4 flex items-center justify-between">
        {otherUsersReviews?.map((review) => (
          <ReviewBox key={review.id} review={review} user={review.user} />
        ))}
      </div>
    </div>
  );
}
