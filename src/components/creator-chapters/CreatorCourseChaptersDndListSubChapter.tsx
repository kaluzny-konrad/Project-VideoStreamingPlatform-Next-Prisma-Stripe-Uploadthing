"use client";

import { SubChapter, Video } from "@prisma/client";
import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";

import DeleteSubChapterButton from "@/components/creator-chapters/DeleteSubChapterButton";
import EditSubChapterModal from "@/components/creator-chapters/EditSubChapterModal";
import UploadVideoSubChapterModal from "./UploadVideoSubChapterModal";

type Props = {
  subChapter: SubChapter;
  subChapterIndex: number;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
  editSubChapter: (subChapter: SubChapter) => void;
  setSubChapterVideo: (
    subChapterId: string,
    videoId: string | null,
  ) => void;
};

export default function CreatorCourseChaptersDndListSubChapter({
  subChapter,
  subChapterIndex,
  deleteSubChapterFromChaptersState,
  editSubChapter,
  setSubChapterVideo,
}: Props) {
  const [optimisticUpdateLoading, setOptimisticUpdateLoading] = useState(false);

  const onSubChapterChanged = (subChapter: SubChapter) => {
    editSubChapter(subChapter);
  };

  const onVideoChanged = (video: Video | undefined) => {
    const subChapterId = subChapter.id;
    const videoId = video?.id ?? null;
    setSubChapterVideo(subChapterId, videoId);
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
            <UploadVideoSubChapterModal
              subChapter={subChapter}
              onChange={onVideoChanged}
              disabled={optimisticUpdateLoading}
              setOptimisticUpdateLoading={setOptimisticUpdateLoading}
            />

            <EditSubChapterModal
              subChapter={subChapter}
              onChange={onSubChapterChanged}
              disabled={optimisticUpdateLoading}
              setOptimisticUpdateLoading={setOptimisticUpdateLoading}
            />

            <DeleteSubChapterButton
              subChapterId={subChapter.id}
              deleteSubChapterFromChaptersState={
                deleteSubChapterFromChaptersState
              }
              disabled={optimisticUpdateLoading}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
