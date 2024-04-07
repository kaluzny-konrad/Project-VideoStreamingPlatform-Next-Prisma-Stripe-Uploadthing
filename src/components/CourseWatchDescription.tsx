"use client";

import { trpc } from "@/server/client";

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

  return <div>
    {isLoading ? (
      <p>Loading...</p>
    ) : course ? (
      <div>
        <h1>{course.name}</h1>
        <p>{course.description}</p>
      </div>
    ) : null}
  </div>;
}
