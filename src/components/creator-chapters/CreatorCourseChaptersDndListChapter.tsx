"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { Chapter, SubChapter, Video } from "@prisma/client";

import { cn } from "@/lib/utils";

import { ChapterActionTypes } from "@/components/creator-chapters/CreatorCourseChapters";
import CreateSubChapterButton from "@/components/creator-chapters/CreateSubChapterButton";
import CreatorCourseChaptersDndListSubChapter from "@/components/creator-chapters/CreatorCourseChaptersDndListSubChapter";
import DeleteChapterButton from "@/components/creator-chapters/DeleteChapterButton";
import EditChapterModal from "./EditChapterModal";

type Props = {
  courseId: string;
  chapter: Chapter;
  chapterIndex: number;
  subChapters: (SubChapter & { Video: Video | null })[];
  pushSubChapterToChaptersState: (
    subChapter: SubChapter & { Video: Video | null },
    chapterId: string,
  ) => void;
  deleteChapterFromChaptersState: (chapterId: string) => void;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
  editChapter: (chapter: Chapter) => void;
  editSubChapter: (subChapter: SubChapter) => void;
  setSubChapterVideo: (subChapterId: string, Video: Video | null) => void;
};

export default function CreatorCourseChaptersDndListChapter({
  courseId,
  chapter,
  chapterIndex,
  subChapters,
  pushSubChapterToChaptersState,
  deleteChapterFromChaptersState,
  deleteSubChapterFromChaptersState,
  editChapter,
  editSubChapter,
  setSubChapterVideo,
}: Props) {
  const [optimisticUpdateLoading, setOptimisticUpdateLoading] = useState(false);

  function onChapterChanged(chapter: Chapter) {
    editChapter(chapter);
  }

  return (
    <Draggable key={chapter.id} draggableId={chapter.id} index={chapterIndex}>
      {(providedDraggableChapter, snapshotDraggableChapter) => (
        <div
          className="mb-2 bg-white"
          ref={providedDraggableChapter.innerRef}
          {...providedDraggableChapter.draggableProps}
        >
          <div
            {...providedDraggableChapter.dragHandleProps}
            className="flex justify-between bg-slate-100 p-2 items-center"
          >
            <p className="font-bold">{chapter.name}</p>

            <div className="flex items-center gap-2">
              <CreateSubChapterButton
                courseId={courseId}
                chapterId={chapter.id}
                pushSubChapterToChaptersState={pushSubChapterToChaptersState}
                disabled={optimisticUpdateLoading}
              />

              <EditChapterModal
                chapter={chapter}
                onChange={onChapterChanged}
                disabled={optimisticUpdateLoading}
                setOptimisticUpdateLoading={setOptimisticUpdateLoading}
              />

              <DeleteChapterButton
                chapterId={chapter.id}
                deleteChapterFromChaptersState={deleteChapterFromChaptersState}
                disabled={subChapters.length > 0 || optimisticUpdateLoading}
              />
            </div>
          </div>

          <Droppable
            droppableId={chapter.id}
            type={ChapterActionTypes.MOVE_SUB_CHAPTER}
          >
            {(providedDroppableSubChapter, snapshotDroppableSubChapter) => (
              <div
                ref={providedDroppableSubChapter.innerRef}
                {...providedDroppableSubChapter.droppableProps}
                className={cn("flex h-full flex-col")}
              >
                {subChapters.map((subChapter, subChapterIndex) => (
                  <CreatorCourseChaptersDndListSubChapter
                    subChapter={subChapter}
                    subChapterIndex={subChapterIndex}
                    key={subChapter.id}
                    deleteSubChapterFromChaptersState={
                      deleteSubChapterFromChaptersState
                    }
                    editSubChapter={editSubChapter}
                    setSubChapterVideo={setSubChapterVideo}
                  />
                ))}

                {providedDroppableSubChapter.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
