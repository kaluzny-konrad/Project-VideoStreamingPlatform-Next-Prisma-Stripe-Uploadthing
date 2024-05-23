"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import CourseCreator from "./CourseCreator";
import Image from "next/image";
import CourseCheckoutButton from "./CourseCheckoutButton";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
  } = trpc.course.getCourseMarketplaceView.useQuery({ courseId });

  const { data: courseOwned, error: errorCourseOwned } =
    trpc.user.isCourseOwned.useQuery({
      courseId,
    });

  if (error) {
    toast.error("Error loading course");
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        </>
      ) : course ? (
        <>
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <Image
              src={course.imageUrl}
              alt={course.name}
              width={600}
              height={400}
              priority
              className={cn(
                "h-36 rounded-lg object-cover",
                "group-hover:opacity-80 transition-opacity duration-300"
              )}
            />
            <div className="flex flex-col mb-2 space-y-4">
              <TextHeader text={`Course: ${course.name}`} />
              <p className="mb-4">{course.description}</p>
              <div className="flex justify-center gap-4 lg:justify-start">
                <div className="px-4 py-2 text-center rounded-md bg-slate-100 w-fit">
                  <p className="font-bold">{course.price} PLN</p>
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
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="w-full lg:w-fit">
              <CourseCreator creatorId={course.creatorId} />
            </div>
            <div>
              <TextSubHeader text="Course stats" />
              <CourseStatsRow
                price={course.price}
                publicatedAt={course.publicatedAt}
                rating={course.stats.rating}
                reviews={course.stats.reviews}
              />
            </div>
          </div>
          <div>
            {course.stats.reviews === 0 ? (
              <>
                <h2 className="font-bold text-slate-600">Reviews</h2>
                <p>No reviews yet</p>
              </>
            ) : (
              <ReviewsAll courseId={course.id} />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
