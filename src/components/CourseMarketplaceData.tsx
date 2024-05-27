"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import CourseCreator from "./CourseCreator";
import Image from "next/image";
import CourseCheckoutButton from "./CourseCheckoutButton";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn, getPublicPhotoUrl, getPublicPrice } from "@/lib/utils";
import CourseWatchButton from "./CourseWatchButton";
import ReviewsAll from "./ReviewsAll";
import CourseStatsRow from "./CourseStatsRow";
import TextHeader from "./base/TextHeader";
import TextSubHeader from "./base/TextSubHeader";

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
    <div className="space-y-4">
      <>
        <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        <Skeleton className="w-full h-24 mt-4 rounded-lg" />
      </>
    </div>;
  }

  if (error || !course) {
    toast.error("Error loading course");
    return <TextSubHeader text="Error loading course" />;
  }

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
              <Link href="/sign-in">
                <Button>Login to buy</Button>
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
