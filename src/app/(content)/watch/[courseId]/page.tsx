import { db } from "@/db";

import { notFound, redirect } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function WatchCoursePage({ params }: Props) {
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

  return notFound();
}
