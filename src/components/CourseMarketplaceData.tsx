"use client";

import { trpc } from "@/server/client";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import CourseCreator from "./CourseCreator";
import CourseImage from "./CourseImage";
import CourseCheckoutButton from "./CourseCheckoutButton";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  courseId: string;
};

export default function CourseMarketplaceData({ courseId }: Props) {
  const {
    data: course,
    error,
    isLoading,
  } = trpc.course.getCourse.useQuery({ courseId });

  const { data: courseOwned, error: errorCourseOwned } =
    trpc.user.isCourseOwned.useQuery({
      courseId,
    });

  if (error) {
    toast.error("Error loading course");
    console.log(error);
  }

  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        </>
      ) : course ? (
        <>
          <h2 className="mb-4 font-bold text-slate-600">{course.name}</h2>
          <CourseImage imageId={course.imageId} />
          <p>{course.description}</p>
          <p>{course.price} PLN</p>
          <CourseCreator creatorId={course.creatorId} />
          {courseOwned ? (
            <Link
              href={`/courses/${courseId}/watch`}
              className={cn(buttonVariants())}
            >
              Watch course
            </Link>
          ) : (
            <CourseCheckoutButton
              stripeProductId={course.stripeProductId}
              courseId={course.id}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
