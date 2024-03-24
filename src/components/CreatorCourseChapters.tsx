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
import { Chapter, ChaptersState, SubChapter } from "@prisma/client";
import { ChaptersFullState } from "@/types/chapter";
import CreatorCourseChaptersDndListChapter from "./CreatorCourseChaptersDndListChapter";
import CreateChapterButton from "./CreateChapterButton";

type Props = {
  courseId: string;
};

export enum ChapterActionTypes {
  MOVE_CHAPTER = "MOVE_CHAPTER",
  MOVE_SUB_CHAPTER = "MOVE_SUB_CHAPTER",
}

export default function CreatorCourseChapters({ courseId }: Props) {
  const {
    data: chaptersInitialState,
    isLoading: chaptersLoading,
    error: chaptersError,
  } = trpc.chapter.getChaptersState.useQuery({ courseId });

  const [chaptersState, setChaptersState] = React.useState<
    ChaptersFullState | undefined
  >(undefined);

  useEffect(() => {
    console.log(chaptersInitialState);
    if (chaptersInitialState) {
      setChaptersState(chaptersInitialState);
    }
  }, [chaptersInitialState]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId, type } = result;

    if (!chaptersState) {
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
      const newChapterIdsOrder = Array.from(chaptersState.ChapterIdsOrder);
      newChapterIdsOrder.splice(source.index, 1);
      newChapterIdsOrder.splice(destination.index, 0, draggableId);

      const newChaptersState: ChaptersFullState = {
        ...chaptersState,
        ChapterIdsOrder: newChapterIdsOrder,
      };

      setChaptersState(newChaptersState);
      return;
    }

    const startChapter = chaptersState.Chapters.find(
      (chapter) => chapter.id === source.droppableId
    );

    const finishChapter = chaptersState.Chapters.find(
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
        ...chaptersState,
        Chapters: {
          ...chaptersState.Chapters,
          [newChapter.id]: newChapter,
        },
      };

      setChaptersState(newState);
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
        ...chaptersState,
        Chapters: {
          ...chaptersState.Chapters,
          [newStartChapter.id]: newStartChapter,
          [newFinishChapter.id]: newFinishChapter,
        },
      };

      setChaptersState(newState);
    }
  };

  if (chaptersLoading) {
    return <div>Loading...</div>;
  }

  if (chaptersError) {
    return <div>{chaptersError.message}</div>;
  }

  const pushChapterToChaptersState = (chapter: Chapter) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: ChaptersFullState = {
      ...chaptersState,
      ChapterIdsOrder: [...chaptersState.ChapterIdsOrder, chapter.id],
      Chapters: [...chaptersState.Chapters, chapter],
    };

    console.log(newChaptersState);
    setChaptersState(newChaptersState);
  };

  const deleteChapterFromChaptersState = (chapterId: string) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: ChaptersFullState = {
      ...chaptersState,
      ChapterIdsOrder: chaptersState.ChapterIdsOrder.filter(
        (id) => id !== chapterId
      ),
      Chapters: chaptersState.Chapters.filter(
        (chapter) => chapter.id !== chapterId
      ),
    };

    console.log(newChaptersState);

    setChaptersState(newChaptersState);
  };

  const pushSubChapterToChaptersState = (
    subChapter: SubChapter,
    chapterId: string
  ) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: ChaptersFullState = {
      ...chaptersState,
      SubChapters: [...chaptersState.SubChapters, subChapter],
      Chapters: chaptersState.Chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            SubChapterIdsOrder: [...chapter.SubChapterIdsOrder, subChapter.id],
          };
        }

        return chapter;
      }),
    };

    setChaptersState(newChaptersState);
  };

  const deleteSubChapterFromChaptersState = (subChapterId: string) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: ChaptersFullState = {
      ...chaptersState,
      SubChapters: chaptersState.SubChapters.filter(
        (subChapter) => subChapter.id !== subChapterId
      ),
      Chapters: chaptersState.Chapters.map((chapter) => {
        return {
          ...chapter,
          SubChapterIdsOrder: chapter.SubChapterIdsOrder.filter(
            (id) => id !== subChapterId
          ),
        };
      }),
    };

    setChaptersState(newChaptersState);
  };

  return (
    <>
      {chaptersState && (
        <>
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
                  {chaptersState.ChapterIdsOrder.map(
                    (chapterId, chapterIndex) => {
                      const chapter = chaptersState.Chapters.find(
                        (chapter) => chapter.id === chapterId
                      );
                      if (!chapter) {
                        return null;
                      }

                      const subChapters = chapter.SubChapterIdsOrder.map(
                        (subChapterId) =>
                          chaptersState.SubChapters.find(
                            (subChapter) => subChapter.id === subChapterId
                          )
                      ).filter(Boolean) as Chapter[];

                      return (
                        <CreatorCourseChaptersDndListChapter
                          key={chapter.id}
                          chapter={chapter}
                          chapterIndex={chapterIndex}
                          subChapters={subChapters}
                          chaptersStateId={chaptersState.id}
                          pushSubChapterToChaptersState={
                            pushSubChapterToChaptersState
                          }
                          deleteChapterFromChaptersState={
                            deleteChapterFromChaptersState
                          }
                          deleteSubChapterFromChaptersState={
                            deleteSubChapterFromChaptersState
                          }
                        />
                      );
                    }
                  )}
                  {providedDroppableChapter.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <CreateChapterButton
            chaptersStateId={chaptersState.id}
            pushChapterToChaptersState={pushChapterToChaptersState}
          />
        </>
      )}
    </>
  );
}
