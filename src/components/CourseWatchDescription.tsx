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
        <h2 className="font-bold text-slate-600">Course Description</h2>
        <Skeleton className="h-16" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>
    </div>
  );
}
