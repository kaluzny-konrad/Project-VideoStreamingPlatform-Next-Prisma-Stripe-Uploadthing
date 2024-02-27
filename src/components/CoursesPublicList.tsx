"use client";

import { trpc } from "@/server/client";
import CoursesListSkeleton from "./CoursesListSkeleton";
import CourseRow from "./CourseRow";
import { useCategories } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import { CourseOnList } from "@/types/course";

type Props = {};

export default function CoursesPublicList({}: Props) {
  const [activeCourses, setActiveCourses] = useState<CourseOnList[]>([]);
  const {
    data: courses,
    isLoading: loading,
    error,
  } = trpc.course.getCoursesListView.useQuery();

  useEffect(() => {
    if (courses) {
      setActiveCourses(courses);
    }
  }, [courses]);

  const { isActive, anyActive, categoriesStateValue } = useCategories();

  useEffect(() => {
    if (categoriesStateValue.categories.length > 0 && !loading && !error) {
      setActiveCourses(
        courses.filter((course) => {
          return !anyActive() || isActive(course.categoryId);
        })
      );
    }
  }, [categoriesStateValue]);

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h1 className="text-lg font-bold text-slate-800">All courses</h1>
      {loading ? (
        <CoursesListSkeleton />
      ) : (
        activeCourses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
