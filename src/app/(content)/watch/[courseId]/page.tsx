import { db } from "@/db";

import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function WatchCoursePage({ params }: Props) {
  const { courseId } = params;

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      Chapters: true,
      SubChapters: true,
    }
  });

  if (!course) {
    notFound();
  }

  if (course) {
    const firstChapterId = course.ChapterIdsOrder[0];
    const firstChapter = course.Chapters.find(
      (chapter) => chapter.id === firstChapterId
    );
    const firstSubChapterId = firstChapter?.SubChapterIdsOrder[0];
    redirect(`/watch/${courseId}/${firstSubChapterId}`);
  }

  return notFound();
}
