"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { Chapter, SubChapter, Video } from "@prisma/client";
import { toast } from "sonner";

import { trpc } from "@/server/client";
import {
  MoveSubChapterRequest,
  UpdateSubChapterIdsOrderRequest,
} from "@/lib/validators/chapter";

import CreatorCourseChaptersDndListChapter from "@/components/creator-chapters/CreatorCourseChaptersDndListChapter";
import CreateChapterButton from "@/components/creator-chapters/CreateChapterButton";

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
  } = trpc.chapter.getChaptersStateWithVideo.useQuery({ courseId });

  const [chaptersState, setChaptersState] = useState<
    typeof chaptersInitialState | undefined
  >(undefined);

  useEffect(() => {
    if (chaptersInitialState && !chaptersLoading) {
      setChaptersState(chaptersInitialState);
    }
  }, [chaptersInitialState, chaptersLoading]);

  const { mutate: updateChapterIdsOrder } =
    trpc.chapter.updateChapterIdsOrder.useMutation({
      onSuccess: (res) => {},
    });

  const { mutate: updateSubChapterIdsOrder } =
    trpc.chapter.updateSubChapterIdsOrder.useMutation({
      onSuccess: (res) => {},
    });

  const { mutate: moveSubChapter } = trpc.chapter.moveSubChapter.useMutation({
    onSuccess: (res) => {},
  });

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

      const newChaptersState: typeof chaptersInitialState = {
        ...chaptersState,
        ChapterIdsOrder: newChapterIdsOrder,
      };

      setChaptersState(newChaptersState);
      updateChapterIdsOrder({
        courseId: chaptersState.id,
        chaptersIdsOrder: newChapterIdsOrder,
      });
      return;
    } else if (type === ChapterActionTypes.MOVE_SUB_CHAPTER) {
      const startChapter = chaptersState.Chapters.find(
        (chapter) => chapter.id === source.droppableId,
      );

      const finishChapter = chaptersState.Chapters.find(
        (chapter) => chapter.id === destination.droppableId,
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

        const newChapters = chaptersState.Chapters.map((chapter) => {
          if (chapter.id === startChapter.id) {
            return newChapter;
          }

          return chapter;
        });

        const newState: typeof chaptersInitialState = {
          ...chaptersState,
          Chapters: newChapters,
        };

        setChaptersState(newState);
        const updateData: UpdateSubChapterIdsOrderRequest = {
          chapterId: startChapter.id,
          subChaptersIdsOrder: newSubChapterIdsOrder,
        };
        updateSubChapterIdsOrder(updateData);
      } else {
        const newStartChapter: Chapter = {
          ...startChapter,
          SubChapterIdsOrder: newSubChapterIdsOrder,
        };

        const finishSubChapterIds = Array.from(
          finishChapter.SubChapterIdsOrder,
        );
        finishSubChapterIds.splice(destination.index, 0, draggableId);

        const newFinishChapter: Chapter = {
          ...finishChapter,
          SubChapterIdsOrder: finishSubChapterIds,
        };

        const newChapters = chaptersState.Chapters.map((chapter) => {
          if (chapter.id === startChapter.id) {
            return newStartChapter;
          } else if (chapter.id === finishChapter.id) {
            return newFinishChapter;
          }

          return chapter;
        });

        const newState: typeof chaptersInitialState = {
          ...chaptersState,
          Chapters: newChapters,
        };

        setChaptersState(newState);
        const moveData: MoveSubChapterRequest = {
          moveSubChapterId: draggableId,
          removeChapterId: startChapter.id,
          addChapterId: finishChapter.id,
          addChapterIdsOrder: finishSubChapterIds,
        };
        moveSubChapter(moveData);
      }
    }
  };

  if (chaptersLoading) {
    return <div>Loading...</div>;
  }

  if (chaptersError) {
    toast.error("Error loading chapters");
    return;
  }

  const pushChapterToChaptersState = (chapter: Chapter) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      ChapterIdsOrder: [...chaptersState.ChapterIdsOrder, chapter.id],
      Chapters: [...chaptersState.Chapters, chapter],
    };

    setChaptersState(newChaptersState);
  };

  const deleteChapterFromChaptersState = (chapterId: string) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      ChapterIdsOrder: chaptersState.ChapterIdsOrder.filter(
        (id) => id !== chapterId,
      ),
      Chapters: chaptersState.Chapters.filter(
        (chapter) => chapter.id !== chapterId,
      ),
    };

    setChaptersState(newChaptersState);
  };

  const pushSubChapterToChaptersState = (
    subChapter: SubChapter & { Video: Video | null },
    chapterId: string,
  ) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: typeof chaptersInitialState = {
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

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      SubChapters: chaptersState.SubChapters.filter(
        (subChapter) => subChapter.id !== subChapterId,
      ),
      Chapters: chaptersState.Chapters.map((chapter) => {
        return {
          ...chapter,
          SubChapterIdsOrder: chapter.SubChapterIdsOrder.filter(
            (id) => id !== subChapterId,
          ),
        };
      }),
    };

    setChaptersState(newChaptersState);
  };

  const editChapter = (updatedChapter: Chapter) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      Chapters: chaptersState.Chapters.map((chapter) => {
        if (chapter.id === updatedChapter.id) {
          return {
            ...chapter,
            name: updatedChapter.name,
          };
        }

        return chapter;
      }),
    };

    setChaptersState(newChaptersState);
  };

  const editSubChapter = (updatedSubChapter: SubChapter) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      SubChapters: chaptersState.SubChapters.map((subChapter) => {
        if (subChapter.id === updatedSubChapter.id) {
          return {
            ...subChapter,
            name: updatedSubChapter.name,
          };
        }

        return subChapter;
      }),
    };

    setChaptersState(newChaptersState);
  };

  const setSubChapterVideo = (subChapterId: string, Video: Video | null) => {
    if (!chaptersState) {
      console.error("No chapters state");
      return;
    }

    const newSubChapters = chaptersState.SubChapters.map((subChapter) => {
      if (subChapter.id === subChapterId) {
        if (Video) {
          return {
            ...subChapter,
            videoId: Video.id,
            Video,
          };
        } else {
          return {
            ...subChapter,
            videoId: null,
            Video: null,
          };
        }
      }

      return subChapter;
    });

    const newChaptersState: typeof chaptersInitialState = {
      ...chaptersState,
      SubChapters: newSubChapters,
    };

    setChaptersState(newChaptersState);
  };

  if (chaptersState) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-chapters"
            type={ChapterActionTypes.MOVE_CHAPTER}
          >
            {(providedDroppableChapter) => (
              <div
                className="flex w-full flex-col"
                ref={providedDroppableChapter.innerRef}
                {...providedDroppableChapter.droppableProps}
              >
                {chaptersState.ChapterIdsOrder.map(
                  (chapterId, chapterIndex) => {
                    const chapter = chaptersState.Chapters.find(
                      (chapter) => chapter.id === chapterId,
                    );
                    if (!chapter) {
                      return null;
                    }

                    const subChapters = chapter.SubChapterIdsOrder.map(
                      (subChapterId) =>
                        chaptersState.SubChapters.find(
                          (subChapter) => subChapter.id === subChapterId,
                        ),
                    ).filter(Boolean) as (SubChapter & {
                      Video: Video | null;
                    })[];

                    return (
                      <CreatorCourseChaptersDndListChapter
                        key={chapter.id}
                        courseId={courseId}
                        chapter={chapter}
                        chapterIndex={chapterIndex}
                        subChapters={subChapters}
                        pushSubChapterToChaptersState={
                          pushSubChapterToChaptersState
                        }
                        deleteChapterFromChaptersState={
                          deleteChapterFromChaptersState
                        }
                        deleteSubChapterFromChaptersState={
                          deleteSubChapterFromChaptersState
                        }
                        editChapter={editChapter}
                        editSubChapter={editSubChapter}
                        setSubChapterVideo={setSubChapterVideo}
                      />
                    );
                  },
                )}
                {providedDroppableChapter.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <CreateChapterButton
          courseId={chaptersState.id}
          pushChapterToChaptersState={pushChapterToChaptersState}
        />
      </>
    );
  }

  return;
}
