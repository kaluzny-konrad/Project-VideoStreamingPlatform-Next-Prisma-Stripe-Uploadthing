import { db } from "@/db";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function CreatorCoursesList({}: Props) {
  const session = await getAuthSession();
  const creatorId = session?.user?.id;

  const courses = await db.course.findMany({
    where: {
      creatorId,
    },
  });

  return (
    <div>
      {courses.map((course) => (
        <Link key={course.id} href={`/creator/courses/${course.id}`}>
          <div>
            <h2>{course.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
