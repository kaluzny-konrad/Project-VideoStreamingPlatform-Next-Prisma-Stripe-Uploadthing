import PocCreateCourseButton from "@/components/PocCreateCourseButton";
import UploadVideoZone from "@/components/UploadVideoZone";
import { db } from "@/db";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const course = await db.course.findFirst();

  return (
    <div>
      <h1>Create new course</h1>
      {!course && <PocCreateCourseButton />}
      <p>Course name: {course?.name}</p>

      <p>Upload zone:</p>
      {course && (
        <>
          <UploadVideoZone courseId={course.id} />
        </>
      )}
    </div>
  );
}
