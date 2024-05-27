"use client";

import { trpc } from "@/server/client";
import CourseRow from "./CourseRow";
import { useCategories } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { getPublicPhotoUrl } from "@/lib/utils";

type Props = {};

export default function CoursesPublicList({}: Props) {
  const [activeCourses, setActiveCourses] = useState<typeof allCourses>([]);
  const {
    data: allCourses,
    isLoading,
    error,
  } = trpc.course.getCourses.useQuery();

  const { categoriesStateValue } = useCategories();

  useEffect(() => {
    if (isLoading || error) return;

    if (categoriesStateValue.activeCategoryIds.length === 0) {
      setActiveCourses(allCourses);
    } else {
      setActiveCourses(
        allCourses.filter((course) => {
          return categoriesStateValue.activeCategoryIds.includes(
            course.categoryId
          );
        })
      );
    }
  }, [isLoading, error, categoriesStateValue.activeCategoryIds, allCourses]);

  if (error || !activeCourses) {
    toast.error("Error loading courses");
    return null;
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
            <CourseRow
              key={course.id}
              course={course}
              photoUrl={getPublicPhotoUrl(course.Photos)}
              reviewsCount={course.Reviews.length}
              redirectToWatch={false}
            />
          ))}
        </>
      )}
    </>
  );
}
