"use client";

import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

import { trpc } from "@/server/client";
import { cn, getPublicPhotoUrl, getPublicPrice } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import ReviewsAll from "@/components/review/ReviewsAll";
import TextHeader from "@/components/base/TextHeader";
import CourseWatchButton from "@/components/course/CourseWatchButton";
import CourseStatsRow from "@/components/course/CourseStatsRow";
import CourseCreator from "@/components/course/CourseCreator";
import CourseCheckoutButton from "@/components/course/CourseCheckoutButton";

type Props = {
  courseId: string;
  isLoggedIn: boolean;
};

export default function CourseMarketplaceData({ courseId, isLoggedIn }: Props) {
  const {
    data: course,
    error,
    isLoading,
  } = trpc.course.getCourse.useQuery({ courseId });

  const { data: courseOwned, error: errorCourseOwned } =
    trpc.user.isCourseOwned.useQuery({
      courseId,
    });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <>
          <Skeleton className="mt-4 h-24 w-full rounded-lg" />
          <Skeleton className="mt-4 h-24 w-full rounded-lg" />
        </>
      </div>
    );
  }

  if (error) {
    toast.error("Error loading course");
    return;
  }

  if (!course) return;

  const mainPhoto = getPublicPhotoUrl(course.Photos);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <Image
          src={mainPhoto}
          alt={course.name}
          width={600}
          height={400}
          priority
          className={cn(
            "rounded-lg object-cover",
            "group-hover:opacity-80 transition-opacity duration-300",
            "aspect-video"
          )}
        />
        <div className="flex flex-col mb-2 space-y-4">
          <TextHeader text={`Course: ${course.name}`} />
          <p className="mb-4">{course.description}</p>
          <div className="flex justify-center gap-4 lg:justify-start">
            <div className="px-4 py-2 text-center rounded-md bg-slate-100 w-fit">
              <p className="font-bold">{getPublicPrice(course.price)} PLN</p>
            </div>
            {courseOwned ? (
              <CourseWatchButton courseId={course.id} />
            ) : isLoggedIn ? (
              <CourseCheckoutButton courseId={course.id} />
            ) : (
              <Link
                href="/sign-in"
                className={cn(buttonVariants())}
                data-test="course-marketplace-login-to-buy"
              >
                Login to buy
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row items-center">
            <div className="w-full lg:w-fit">
              <CourseCreator creatorId={course.creatorId} />
            </div>
            <div>
              <CourseStatsRow
                price={course.price}
                publicatedAt={course.createdAt}
                rating={course.rating}
                reviewsCount={course.Reviews.length}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {course.Reviews.length === 0 ? (
          <>
            <h2 className="font-bold text-slate-600">Reviews</h2>
            <p>No reviews yet</p>
          </>
        ) : (
          <ReviewsAll courseId={course.id} />
        )}
      </div>
    </div>
  );
}
