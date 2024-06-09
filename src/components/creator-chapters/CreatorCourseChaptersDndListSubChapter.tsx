"use client";

import { SubChapter } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";

import DeleteSubChapterButton from "@/components/creator-chapters/DeleteSubChapterButton";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

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
            "mx-2 flex max-h-10 grow items-center justify-between border-b-2 border-dotted bg-white py-2",
          )}
          ref={providedDraggableSubChapter.innerRef}
          {...providedDraggableSubChapter.draggableProps}
          {...providedDraggableSubChapter.dragHandleProps}
        >
          <p className="text-sm">{`${subChapter.name}`}</p>

          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={handleEditButton}
              className="h-6 w-6"
              size={"icon"}
              variant={"ghost"}
              data-test="creator-course-chapters-dnd-list-subchapter-edit"
            >
              <EditIcon className="h-4 w-4" />
            </Button>

            <DeleteSubChapterButton
              subChapterId={subChapter.id}
              deleteSubChapterFromChaptersState={
                deleteSubChapterFromChaptersState
              }
              disabled={false}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
