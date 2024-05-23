"use client";

import { trpc } from "@/server/client";
import CourseRow from "./CourseRow";
import { useCategories } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import { CourseOnList } from "@/types/course";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export default function CoursesPublicList({}: Props) {
  const [activeCourses, setActiveCourses] = useState<CourseOnList[]>([]);
  const {
    data: allCourses,
    isLoading,
    error,
  } = trpc.course.getCoursesListView.useQuery();

  const { categoriesStateValue } = useCategories();

  useEffect(() => {
    if (isLoading || error) return;

    if (categoriesStateValue.activeCategoryId === null) {
      setActiveCourses(allCourses);
    } else {
      setActiveCourses(
        allCourses.filter((course) => {
          return course.categoryId === categoriesStateValue.activeCategoryId;
        })
      );
    }
  }, [isLoading, error, categoriesStateValue.activeCategoryId, allCourses]);

  if (error) {
    toast.error("Error loading courses");
  }

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
          <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        </>
      ) : (
        <>
          {activeCourses.map((course) => (
            <CourseRow key={course.id} course={course} redirectToWatch={false} />
          ))}
        </>
      )}
    </>
  );
}
