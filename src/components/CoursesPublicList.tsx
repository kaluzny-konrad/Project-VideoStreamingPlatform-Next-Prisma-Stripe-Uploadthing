"use client";

import { trpc } from "@/server/client";
import CoursesListSkeleton from "./CoursesListSkeleton";
import CourseRow from "./CourseRow";

type Props = {};

export default function CoursesPublicList({}: Props) {
  const {
    data: courses,
    isLoading: loading,
    error,
  } = trpc.course.getCoursesListView.useQuery();

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h1 className="mb-6 text-lg font-bold text-slate-800">All courses</h1>
      {loading ? (
        <CoursesListSkeleton />
      ) : (
        courses?.map((course) => <CourseRow key={course.id} course={course} />)
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
