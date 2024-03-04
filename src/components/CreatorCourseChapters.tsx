"use client";

import { trpc } from "@/server/client";
import React, { useEffect } from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  Droppable,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { Chapter, ChaptersState } from "@prisma/client";
import { ChaptersFullState } from "@/types/chapter";
import CreatorCourseChaptersDndListChapter from "./CreatorCourseChaptersDndListChapter";

type Props = {
  courseId: string;
};

export enum ChapterActionTypes {
  MOVE_CHAPTER = "MOVE_CHAPTER",
  MOVE_SUB_CHAPTER = "MOVE_SUB_CHAPTER",
}

export default function CreatorCourseChapters({ courseId }: Props) {
  const {
    data: initialData,
    isLoading: chaptersLoading,
    error: chaptersError,
  } = trpc.chapter.getChaptersState.useQuery({ courseId });

  const [state, setState] = React.useState<ChaptersFullState | undefined>(
    undefined
  );

  useEffect(() => {
    if (initialData) {
      setState(initialData);
    }
  }, [initialData]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId, type } = result;

    if (!state) {
      return;
    }

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === ChapterActionTypes.MOVE_CHAPTER) {
      const newChapterIdsOrder = Array.from(state.chapterIdsOrder);
      newChapterIdsOrder.splice(source.index, 1);
      newChapterIdsOrder.splice(destination.index, 0, draggableId);

      const newChaptersState: ChaptersFullState = {
        ...state,
        chapterIdsOrder: newChapterIdsOrder,
      };

      setState(newChaptersState);
      return;
    }

    const startChapter = state.Chapters.find(
      (chapter) => chapter.id === source.droppableId
    );

    const finishChapter = state.Chapters.find(
      (chapter) => chapter.id === destination.droppableId
    );

    if (!startChapter || !finishChapter) {
      return;
    }

    const newSubChapterIdsOrder = Array.from(startChapter.SubChapterIdsOrder);
    newSubChapterIdsOrder.splice(source.index, 1);

    if (startChapter === finishChapter) {
      newSubChapterIdsOrder.splice(destination.index, 0, draggableId);

      const newChapter: Chapter = {
        ...startChapter,
        SubChapterIdsOrder: newSubChapterIdsOrder,
      };

      const newState: ChaptersFullState = {
        ...state,
        Chapters: {
          ...state.Chapters,
          [newChapter.id]: newChapter,
        },
      };

      setState(newState);
    } else {
      const newStartChapter: Chapter = {
        ...startChapter,
        SubChapterIdsOrder: newSubChapterIdsOrder,
      };

      const finishSubChapterIds = Array.from(finishChapter.SubChapterIdsOrder);
      finishSubChapterIds.splice(destination.index, 0, draggableId);

      const newFinishChapter: Chapter = {
        ...finishChapter,
        SubChapterIdsOrder: finishSubChapterIds,
      };

      const newState: ChaptersFullState = {
        ...state,
        Chapters: {
          ...state.Chapters,
          [newStartChapter.id]: newStartChapter,
          [newFinishChapter.id]: newFinishChapter,
        },
      };

      setState(newState);
    }
  };

  if (chaptersLoading) {
    return <div>Loading...</div>;
  }

  if (chaptersError) {
    return <div>{chaptersError.message}</div>;
  }

  return (
    <>
      {state && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-chapters"
            type={ChapterActionTypes.MOVE_CHAPTER}
          >
            {(providedDroppableChapter) => (
              <div
                className="flex flex-col w-full"
                ref={providedDroppableChapter.innerRef}
                {...providedDroppableChapter.droppableProps}
              >
                {state.chapterIdsOrder.map((chapterId, chapterIndex) => {
                  const chapter = state.Chapters.find(
                    (chapter) => chapter.id === chapterId
                  );
                  if (!chapter) {
                    return null;
                  }

                  const subChapters = chapter.SubChapterIdsOrder.map(
                    (subChapterId) =>
                      state.SubChapters.find(
                        (subChapter) => subChapter.id === subChapterId
                      )
                  ).filter(Boolean) as Chapter[];

                  return (
                    <CreatorCourseChaptersDndListChapter
                      key={chapter.id}
                      chapter={chapter}
                      chapterIndex={chapterIndex}
                      subChapters={subChapters}
                    />
                  );
                })}
                {providedDroppableChapter.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
