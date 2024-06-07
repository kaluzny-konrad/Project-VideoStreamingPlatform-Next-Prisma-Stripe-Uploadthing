import { db } from "@/db";
import { formatPrice } from "@/lib/utils";

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
      {course?.price && <p>Course price: {formatPrice(course?.price)}</p>}
      <p>Course description: {course?.description}</p>
    </div>
  );
}
