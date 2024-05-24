"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";

export default function CoursesCreatorStats() {
  const {
    data: stats,
    isLoading,
    error,
  } = trpc.course.getCourseCreatorStats.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error("Error loading stats");
  }

  return (
    <>
      {stats && (
        <div>
          <div>Courses: {stats.coursesCount}</div>
          <div>Reviews: {stats.reviewsCount}</div>
          <div>Rating: {stats.rating}</div>
        </div>
      )}
    </>
  );
}
