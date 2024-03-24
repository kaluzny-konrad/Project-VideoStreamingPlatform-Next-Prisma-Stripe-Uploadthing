import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Chapter, SubChapter } from "@prisma/client";
import React from "react";
import CreatorCourseChaptersDndListSubChapter from "./CreatorCourseChaptersDndListSubChapter";
import { ChapterActionTypes } from "./CreatorCourseChapters";
import { cn } from "@/lib/utils";
import CreateSubChapterButton from "./CreateSubChapterButton";
import { Button } from "./ui/button";
import DeleteChapterButton from "./DeleteChapterButton";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  subChapters: SubChapter[];
  chaptersStateId: string;
  pushSubChapterToChaptersState: (
    subChapter: SubChapter,
    chapterId: string
  ) => void;
  deleteChapterFromChaptersState: (chapterId: string) => void;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
};

export default function CreatorCourseChaptersDndListChapter({
  chapter,
  chapterIndex,
  subChapters,
  chaptersStateId,
  pushSubChapterToChaptersState,
  deleteChapterFromChaptersState,
  deleteSubChapterFromChaptersState
}: Props) {
  return (
    <Draggable key={chapter.id} draggableId={chapter.id} index={chapterIndex}>
      {(providedDraggableChapter, snapshotDraggableChapter) => (
        <div
          className="pt-4 m-2 border bg-white"
          ref={providedDraggableChapter.innerRef}
          {...providedDraggableChapter.draggableProps}
        >
          <h3
            className="mb-4 ml-2 font-bold"
            {...providedDraggableChapter.dragHandleProps}
          >
            {chapter.name}
          </h3>
          <Droppable
            droppableId={chapter.id}
            type={ChapterActionTypes.MOVE_SUB_CHAPTER}
          >
            {(providedDroppableSubChapter, snapshotDroppableSubChapter) => (
              <div
                ref={providedDroppableSubChapter.innerRef}
                {...providedDroppableSubChapter.droppableProps}
                className={cn(
                  "p-2 border-t bg-white flex flex-col h-full",
                  snapshotDroppableSubChapter.isDraggingOver && "bg-yellow-50"
                )}
              >
                <div className="flex gap-2">
                  <p>{`Snapshot: ${chapter.name} `}</p>
                  <p>{` - isDraggingOver: ${snapshotDroppableSubChapter.isDraggingOver} `}</p>
                  <p>{` - draggingOverWith: ${snapshotDroppableSubChapter.draggingOverWith} `}</p>
                </div>

                <CreateSubChapterButton
                  chaptersStateId={chaptersStateId}
                  chapterId={chapter.id}
                  pushSubChapterToChaptersState={pushSubChapterToChaptersState}
                />

                <DeleteChapterButton
                  chapterId={chapter.id}
                  deleteChapterFromChaptersState={
                    deleteChapterFromChaptersState
                  }
                  disabled={subChapters.length > 0}
                />

                {subChapters.map((subChapter, subChapterIndex) => (
                  <CreatorCourseChaptersDndListSubChapter
                    subChapter={subChapter}
                    subChapterIndex={subChapterIndex}
                    key={subChapter.id}
                    deleteSubChapterFromChaptersState={deleteSubChapterFromChaptersState}
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
