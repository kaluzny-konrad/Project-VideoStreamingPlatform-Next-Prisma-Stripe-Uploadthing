import { db } from "@/db";
import React from "react";

type Props = {
  courseId: string;
};

export default async function CreatorCourseInfo({ courseId }: Props) {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  return (
    <div>
      <p>Course name: {course?.name}</p>
      <p>Course price: {course?.price}</p>
      <p>Course description: {course?.description}</p>
    </div>
  );
}
