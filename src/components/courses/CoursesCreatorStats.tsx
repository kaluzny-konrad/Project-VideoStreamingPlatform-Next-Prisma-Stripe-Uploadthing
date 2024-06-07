"use client";

import { toast } from "sonner";

import { trpc } from "@/server/client";

export default function CoursesCreatorStats() {
  const {
    data: courses,
    isLoading,
    error,
  } = trpc.creator.getCourses.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !courses) {
    toast.error("Error loading stats");
    return null;
  }

  return (
    <div>
      <div>Courses: {courses.length}</div>
      <div>
        Reviews:{" "}
        {courses.reduce((acc, course) => acc + course.Reviews.length, 0)}
      </div>
      <div>
        Rating:{" "}
        {courses.length > 0
          ? courses.reduce((acc, course) => acc + course.rating, 0) /
            courses.length
          : "N/A"}
      </div>
    </div>
  );
}
