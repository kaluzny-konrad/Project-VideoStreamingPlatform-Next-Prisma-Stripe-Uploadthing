"use client";

import { trpc } from "@/server/client";
import CoursesListSkeleton from "./CoursesListSkeleton";
import CourseRow from "./CourseRow";
import { useCategories } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import { CourseOnList } from "@/types/course";
import { toast } from "sonner";

type Props = {};

export default function CoursesPublicList({}: Props) {
  const [activeCourses, setActiveCourses] = useState<CourseOnList[]>([]);
  const {
    data: courses,
    isLoading: loading,
    error,
  } = trpc.course.getCoursesListView.useQuery();

  const { isActive, categoriesStateValue } = useCategories();

  useEffect(() => {
    if (categoriesStateValue.anyActive === false && !loading && !error) {
      setActiveCourses(courses);
    }
    else if (categoriesStateValue.categories.length > 0 && !loading && !error) {
      setActiveCourses(
        courses.filter((course) => {
          return isActive(course.categoryId);
        })
      );
    }
  }, [categoriesStateValue, courses]);

  useEffect(() => {
    if (error) {
      toast.error("Error loading courses");
      console.log(error);
    }
  });

  return (
    <>
      {loading ? (
        <CoursesListSkeleton />
      ) : (
        activeCourses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))
      )}
    </>
  );
}
