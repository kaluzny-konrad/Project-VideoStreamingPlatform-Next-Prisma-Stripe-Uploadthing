"use client";

import { toast } from "sonner";
import { Chapter } from "@prisma/client";

import { trpc } from "@/server/client";

import CourseChaptersList from "@/components/course/CourseChaptersList";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <>
          <Skeleton className="mt-4 h-24 w-full rounded-lg" />
          <Skeleton className="mt-4 h-24 w-full rounded-lg" />
        </>
      </div>
    );
  }

  if (error) {
    toast.error("Error loading chapters");
    return;
  }

  if (!chaptersState) return;

  return (
    <>
      {chaptersState.ChapterIdsOrder.map((chapterId) => {
        const chapter = chaptersState.Chapters.find(
          (chapter) => chapter.id === chapterId,
        );
        if (!chapter) return;

        const subChapters = chapter.SubChapterIdsOrder.map((subChapterId) =>
          chaptersState.SubChapters.find(
            (subChapter) => subChapter.id === subChapterId,
          ),
        ).filter(Boolean) as typeof chaptersState.SubChapters;

        return (
          <CourseChaptersList
            key={chapter.id}
            courseId={courseId}
            chapter={chapter}
            subChapters={subChapters}
            closeModal={closeModal}
          />
        );
      })}
    </>
  );
}
