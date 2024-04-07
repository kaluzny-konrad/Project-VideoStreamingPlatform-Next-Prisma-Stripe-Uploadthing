"use client";

import { trpc } from "@/server/client";
import { Review } from "@prisma/client";
import { useEffect, useState } from "react";
import ReviewDeleteButton from "./ReviewDeleteButton";
import ReviewEditButton from "./ReviewEditButton";
import ReviewAddButton from "./ReviewAddButton";
import { Skeleton } from "./ui/skeleton";
import ReviewBox from "./ReviewBox";

type Props = {
  courseId: string;
};

export default function ReviewUser({ courseId }: Props) {
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [optimisticUpdateLoading, setOptimisticUpdateLoading] = useState(false);

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = trpc.user.getUserData.useQuery();

  const {
    data: review,
    error,
    isLoading,
  } = trpc.review.getUserReview.useQuery({ courseId });

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (review) {
      setUserReview(review);
    }
  }, [review]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 mb-4">
        <p className="font-bold text-slate-600">Your Review</p>
        <Skeleton className="h-16" />
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold text-slate-600">Your Review</p>
      <div className="p-4 my-4 border-b border-gray-200 gap-4 flex items-center justify-between">
        {userReview && user ? (
          <>
            <ReviewBox review={userReview} user={user} />
            <div className="flex flex-col gap-2">
              <ReviewDeleteButton
                reviewId={userReview.id}
                setUserReview={setUserReview}
                initialReview={userReview}
                optimisticUpdateLoading={optimisticUpdateLoading}
                setOptimisticUpdateLoading={setOptimisticUpdateLoading}
              />
              <ReviewEditButton
                reviewId={userReview.id}
                setUserReview={setUserReview}
                initialReview={userReview}
                optimisticUpdateLoading={optimisticUpdateLoading}
                setOptimisticUpdateLoading={setOptimisticUpdateLoading}
              />
            </div>
          </>
        ) : (
          <>
            <ReviewAddButton
              courseId={courseId}
              setUserReview={setUserReview}
              optimisticUpdateLoading={optimisticUpdateLoading}
              setOptimisticUpdateLoading={setOptimisticUpdateLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
