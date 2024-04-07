"use client";

import { trpc } from "@/server/client";
import { Skeleton } from "./ui/skeleton";

type Props = {
  courseId: string;
};

export default function CourseWatchDescription({ courseId }: Props) {
  const {
    data: course,
    error,
    isLoading,
  } = trpc.course.getCourse.useQuery({
    courseId,
  });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-bold text-slate-600">Course Description</p>
        <Skeleton className="h-16" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div>
      <p className="font-bold text-slate-600">Course Description</p>
      <p>{course.name}</p>
      <p>{course.description}</p>
    </div>
  );
}
