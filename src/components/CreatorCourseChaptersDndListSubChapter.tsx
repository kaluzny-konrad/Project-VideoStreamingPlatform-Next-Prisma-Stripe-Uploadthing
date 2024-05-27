"use client";

import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { SubChapter } from "@prisma/client";
import DeleteSubChapterButton from "./DeleteSubChapterButton";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  subChapter: SubChapter;
  subChapterIndex: number;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
  courseId: string;
};

export default function CreatorCourseChaptersDndListSubChapter({
  subChapter,
  subChapterIndex,
  deleteSubChapterFromChaptersState,
  courseId,
}: Props) {
  const router = useRouter();
  
  const handleEditButton = () => {
    router.push(`/creator/courses/${courseId}/subchapters/${subChapter.id}`);
  };

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

          <Button
            onClick={handleEditButton}
            className="ml-auto"
            variant="secondary"
            data-test="creator-course-chapters-dnd-list-subchapter-edit"
          >
            Edit
          </Button>

          <DeleteSubChapterButton
            subChapterId={subChapter.id}
            deleteSubChapterFromChaptersState={
              deleteSubChapterFromChaptersState
            }
            disabled={snapshotDraggableSubChapter.isDragging}
          />
        </div>
      )}
    </Draggable>
  );
}
