import CreateCourseButton from "@/components/CreateCourseButton";
import UploadZone from "@/components/UploadZone";
import { db } from "@/db";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const course = await db.course.findFirst({ include: { Product: true } });

  return (
    <div>
      <h1>Create new course</h1>
      {!course && <CreateCourseButton />}
      <p>Course name: {course?.Product.name}</p>

      <p>Upload zone:</p>
      {course && (
        <>
          <UploadZone courseId={course.id} />
        </>
      )}
    </div>
  );
}
