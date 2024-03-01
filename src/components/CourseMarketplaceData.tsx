"use client";

import { trpc } from "@/server/client";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import CourseCreator from "./CourseCreator";
import CourseImage from "./CourseImage";
import CourseCheckoutButton from "./CourseCheckoutButton";

type Props = {
  courseId: string;
};

export default function CourseMarketplaceData({ courseId }: Props) {
  const {
    data: course,
    error,
    isLoading,
  } = trpc.course.getCourse.useQuery({ courseId });

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
          <CourseCheckoutButton stripeProductId={course.stripeProductId} />
        </>
      ) : null}
    </div>
  );
}
