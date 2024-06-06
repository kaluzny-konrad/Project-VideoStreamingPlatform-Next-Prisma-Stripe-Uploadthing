import { Course } from "@prisma/client";
import Link from "next/link";

type Props = {
  course: Course;
};

export default function CreatorCourseRow({ course }: Props) {
  return (
    <Link key={course.id} href={`/creator/courses/${course.id}`}
      data-test="creator-course-row-link"
    >
      <div>
        <h2>{course.name}</h2>
      </div>
    </Link>
  );
}
