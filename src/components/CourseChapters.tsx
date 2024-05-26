"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Chapter } from "@prisma/client";
import CourseChaptersList from "./CourseChaptersList";

type Props = {
  courseId: string;
  closeModal?: () => void;
};

export default function CourseChapters({ courseId, closeModal }: Props) {
  const {
    data: chaptersState,
    error,
    isLoading,
  } = trpc.chapter.getChaptersState.useQuery({
    courseId,
  });

  if (error) {
    toast.error("Error loading chapters");
    console.error(error);
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <p>Loading...</p>
      ) : chaptersState ? (
        <>
          {chaptersState.ChapterIdsOrder.map((chapterId) => {
            const chapter = chaptersState.Chapters.find(
              (chapter) => chapter.id === chapterId
            );
            if (!chapter) {
              return null;
            }

            const subChapters = chapter.SubChapterIdsOrder.map((subChapterId) =>
              chaptersState.SubChapters.find(
                (subChapter) => subChapter.id === subChapterId
              )
            ).filter(Boolean) as Chapter[];

            return (
                <CourseChaptersList
                    key={chapter.id}
                    courseId={courseId}
                    chapter={chapter}
                    subChapters={subChapters}
                    closeModal={closeModal}
                />
            )
          })}
        </>
      ) : null}
    </div>
  );
}
