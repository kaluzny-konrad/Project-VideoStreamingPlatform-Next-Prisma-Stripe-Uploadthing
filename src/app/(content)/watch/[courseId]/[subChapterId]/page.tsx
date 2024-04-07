import CourseVideo from "@/components/CourseVideo";
import CourseVideos from "@/components/CourseVideos";
import CourseWatchDescription from "@/components/CourseWatchDescription";
import { db } from "@/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    courseId: string;
    subChapterId: string;
  };
};

export default async function page({ params }: Props) {
  const { courseId, subChapterId } = params;

  const subChapter = await db.subChapter.findFirst({
    where: {
      id: subChapterId,
    },
    include: {
      Video: true,
    }
  });

  if (!subChapter) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Watch Course</h1>
      {subChapter?.Video && <CourseVideo subChapterId={subChapterId} />}
      <CourseWatchDescription courseId={courseId} />
    </>
  );
}
