import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { SubChapter } from "@prisma/client";
import React from "react";
import DeleteSubChapterButton from "./DeleteSubChapterButton";

type Props = {
  subChapter: SubChapter;
  subChapterIndex: number;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
};

export default function CreatorCourseChaptersDndListSubChapter({
  subChapter,
  subChapterIndex,
  deleteSubChapterFromChaptersState,
}: Props) {
  return (
    <Draggable
      key={subChapter.id}
      draggableId={subChapter.id}
      index={subChapterIndex}
    >
      {(providedDraggableSubChapter, snapshotDraggableSubChapter) => (
        <div
          className={cn(
            "p-2 m-2 border bg-white flex items-center grow",
            snapshotDraggableSubChapter.isDragging && "bg-indigo-100"
          )}
          ref={providedDraggableSubChapter.innerRef}
          {...providedDraggableSubChapter.draggableProps}
          {...providedDraggableSubChapter.dragHandleProps}
        >
          {`${subChapter.name}`}
          {` - ${subChapter.id} `}
          {` - index: ${subChapterIndex} `}
          {` - isDragging: ${snapshotDraggableSubChapter.isDragging} `}
          {` - draggingOver: ${snapshotDraggableSubChapter.draggingOver} `}
          <DeleteSubChapterButton
            subChapterId={subChapter.id}
            deleteSubChapterFromChaptersState={deleteSubChapterFromChaptersState}
            disabled={snapshotDraggableSubChapter.isDragging}
          />
        </div>
      )}
    </Draggable>
  );
}
