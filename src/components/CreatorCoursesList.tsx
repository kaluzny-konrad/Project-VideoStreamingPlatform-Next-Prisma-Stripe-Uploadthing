import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import CreatorCourseRow from "./CreatorCourseRow";

type Props = {};

export default async function CreatorCoursesList({}: Props) {
  const user = await currentUser();
  const creatorId = user?.id;

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
