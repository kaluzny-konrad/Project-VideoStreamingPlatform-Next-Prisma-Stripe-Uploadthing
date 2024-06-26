"use client";

import { trpc } from "@/server/client";

import { Skeleton } from "@/components/ui/skeleton";
import ReviewBox from "@/components/review/ReviewBox";

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
        <p className="font-bold text-slate-600">Other Reviews</p>
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold text-slate-600">Other Reviews</p>
      <div className="p-4 my-4 border-b border-gray-200 gap-4 flex items-center justify-between">
        {otherUsersReviews?.map((review) => (
          <ReviewBox key={review.id} review={review} user={review.user} />
        ))}
      </div>
    </div>
  );
}
