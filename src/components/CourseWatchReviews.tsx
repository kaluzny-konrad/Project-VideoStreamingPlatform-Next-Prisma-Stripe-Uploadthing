"use client";

import { trpc } from "@/server/client";
import { Review } from "@prisma/client";
import { useEffect, useState } from "react";
import ReviewDeleteButton from "./ReviewDeleteButton";
import ReviewEditButton from "./ReviewEditButton";
import ReviewAddButton from "./ReviewAddButton";

type Props = {
  courseId: string;
};

export default function CourseWatchReviews({ courseId }: Props) {
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [optimisticUpdateLoading, setOptimisticUpdateLoading] = useState(false);
  const [otherUsersReviews, setOtherUsersReviews] = useState<Review[] | null>(
    null
  );

  const {
    data: reviewsOnCourse,
    error,
    isLoading,
  } = trpc.review.getReviewsOnCourse.useQuery({ courseId });

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (reviewsOnCourse) {
      setUserReview(
        reviewsOnCourse.reviews.find(
          (review) => review.id === reviewsOnCourse.userReviewId
        ) ?? null
      );
      setOtherUsersReviews(
        reviewsOnCourse.reviews.filter(
          (review) => review.id !== reviewsOnCourse.userReviewId
        )
      );
    }
  }, [reviewsOnCourse]);

  useEffect(() => {
    console.log("optimisticUpdateLoading", optimisticUpdateLoading);
    console.log("userReview", userReview);
  }, [optimisticUpdateLoading, userReview]);

  return (
    <div>
      <h2 className="font-bold text-slate-600">Reviews</h2>
      {isLoading ? (
        <></>
      ) : (
        <>
          {reviewsOnCourse === undefined ||
            (reviewsOnCourse.reviews.length === 0 && (
              <>
                <p>No reviews yet</p>
              </>
            ))}

          {userReview ? (
            <>
              <p>Twoja opinia:</p>
              <p>{userReview.title}</p>
              <p>{userReview.rating}</p>
              <p>{userReview.comment}</p>
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

          {otherUsersReviews && otherUsersReviews.length > 0 && (
            <ul>
              <p>Opinie innych użytkowników:</p>

              {otherUsersReviews?.map((review) => (
                <li key={review.id}>
                  <p>{review.title}</p>
                  <p>{review.rating}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
