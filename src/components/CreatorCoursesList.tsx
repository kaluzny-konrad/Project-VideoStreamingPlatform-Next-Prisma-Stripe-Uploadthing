import { db } from "@/db";
import { getAuthSession } from "@/lib/auth";
import CreatorCourseRow from "./CreatorCourseRow";

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
        <CreatorCourseRow key={course.id} course={course} />
      ))}
    </div>
  );
}
