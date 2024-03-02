"use client";

import { trpc } from "@/server/client";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import CourseCreator from "./CourseCreator";
import Image from "next/image";
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
  } = trpc.course.getCourseMarketplaceView.useQuery({ courseId });

  const { data: courseOwned, error: errorCourseOwned } =
    trpc.user.isCourseOwned.useQuery({
      courseId,
    });

  if (error) {
    toast.error("Error loading course");
    console.log(error);
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
          <div className="flex gap-8">
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
            <div className="space-y-2">
              <h2 className="mb-4 font-bold text-slate-600">{course.name}</h2>
              <p>{course.description}</p>
              <div className="flex gap-4">
                <div className="bg-slate-100 rounded-md w-fit px-4 py-2 text-center">
                  <p className="font-bold">{course.price} PLN</p>
                </div>
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
              </div>
            </div>
            <div>
              <p className="font-bold w-36">Autor</p>
              <CourseCreator creatorId={course.creatorId} />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-slate-600">Course content</h2>
            <p>Not available yet</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-600">Course stats</h2>
            <div className="flex gap-4">
              <div>
                <p className="font-bold">Views</p>
                <p>{10}</p>
              </div>
              <div>
                <p className="font-bold">Comments</p>
                <p>{10}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-slate-600">Comments</h2>
            <p>No comments yet</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
