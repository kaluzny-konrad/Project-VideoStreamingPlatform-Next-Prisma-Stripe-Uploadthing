"use client";

import { trpc } from "@/server/client";
import CourseRow from "./CourseRow";
import { useCategories } from "@/hooks/use-categories";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export default function CoursesPrivateList({}: Props) {
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
            return categoriesStateValue.activeCategoryIds.includes(
              course.categoryId
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

        let mainPhoto = course.Photos.find((photo) => photo.isMainPhoto);
        if (!mainPhoto && course.Photos.length > 0)
          mainPhoto = course.Photos[0];

        const reviewsCount = course.Reviews.length;

        return (
          <CourseRow
            key={course.id}
            course={course}
            redirectToWatch={true}
            photo={mainPhoto}
            reviewsCount={reviewsCount}
          />
        );
      })}
    </>
  );
}
