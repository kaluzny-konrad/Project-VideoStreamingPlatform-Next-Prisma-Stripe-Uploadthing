"use client";

import { trpc } from "@/server/client";
import { Review } from "@prisma/client";
import { useEffect, useState } from "react";
import ReviewAddForm from "./ReviewAddForm";

type Props = {
  courseId: string;
};

export default function CourseWatchReviews({ courseId }: Props) {
  const [userReview, setUserReview] = useState<Review | null>(null);

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
    }
  }, [reviewsOnCourse]);

  return (
    <div>
      <h2 className="font-bold text-slate-600">Reviews</h2>
      {isLoading ? (
        <></>
      ) : (
        <>
          {reviewsOnCourse === undefined ||
          reviewsOnCourse.reviews?.length === 0 ? (
            <>
              <p>No reviews yet</p>
              <ReviewAddForm courseId={courseId} />
            </>
          ) : (
            <ul>
              {userReview ? (
                <>
                  <p>Twoja opinia:</p>
                  <li key={userReview.id}>
                    <p>{userReview.title}</p>
                    <p>{userReview.rating}</p>
                    <p>{userReview.comment}</p>
                  </li>
                </>
              ) : (
                <>
                  <ReviewAddForm courseId={courseId} />
                </>
              )}

              <p>Opinie innych użytkowników:</p>

              {reviewsOnCourse.reviews?.map((review) => (
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
