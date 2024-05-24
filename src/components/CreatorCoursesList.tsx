import { db } from "@/db";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

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
    <div className="flex flex-col gap-2">
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
