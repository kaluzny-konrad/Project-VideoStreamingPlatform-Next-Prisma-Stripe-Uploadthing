import CourseWatchDescription from "@/components/CourseWatchDescription";
import { db } from "@/db";

import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function page({ params }: Props) {
  const { courseId } = params;

  const chaptersState = await db.chaptersState.findUnique({
    where: {
      courseId,
    },
    include: {
      Chapters: true,
      SubChapters: true,
    }
  });

  if (!chaptersState) {
    notFound();
  }

  if (chaptersState) {
    const firstChapterId = chaptersState.ChapterIdsOrder[0];
    const firstChapter = chaptersState.Chapters.find(
      (chapter) => chapter.id === firstChapterId
    );
    const firstSubChapterId = firstChapter?.SubChapterIdsOrder[0];
    redirect(`/watch/${courseId}/${firstSubChapterId}`);
  }

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Watch Course</h1>
      <CourseWatchDescription courseId={courseId} />
    </>
  );
}
