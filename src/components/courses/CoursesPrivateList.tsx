"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { trpc } from "@/server/client";
import { useCategories } from "@/hooks/use-categories";
import { getPublicPhotoUrl } from "@/lib/utils";

import CourseRow from "@/components/course/CourseRow";
import { Skeleton } from "@/components/ui/skeleton";

// Analogous to CoursesPublicList.tsx
export default function CoursesPrivateList() {
  const [activeCourseIds, setActiveCourseIds] = useState<string[]>([]);
  const {
    data: allCourses,
    isLoading,
    error,
  } = trpc.course.getCoursesOwnedByUser.useQuery();

  const { categoriesStateValue } = useCategories();

  useEffect(() => {
    if (isLoading || error) return;

    if (categoriesStateValue.activeCategoryIds.length === 0) {
      setActiveCourseIds(allCourses.map((course) => course.id));
    } else {
      setActiveCourseIds(
        allCourses
          .filter((course) => {
            return course.Categories.some((category) =>
              categoriesStateValue.activeCategoryIds.includes(category.id)
            );
          })
          .map((course) => course.id)
      );
    }
  }, [isLoading, error, categoriesStateValue.activeCategoryIds, allCourses]);

  if (error) {
    toast.error("Error loading courses");
  }

  if (isLoading)
    return (
      <>
        <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        <Skeleton className="w-full h-24 mt-4 rounded-lg" />
        <Skeleton className="w-full h-24 mt-4 rounded-lg" />
      </>
    );

  if (!allCourses) return <></>;

  return (
    <>
      {activeCourseIds.map((courseId) => {
        const course = allCourses.find((course) => course.id === courseId)!;
        if (!course) return <></>;

        const reviewsCount = course.Reviews.length;

        return (
          <CourseRow
            key={course.id}
            course={course}
            redirectToWatch={true}
            photoUrl={getPublicPhotoUrl(course.Photos)}
            reviewsCount={reviewsCount}
          />
        );
      })}
    </>
  );
}
