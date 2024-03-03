"use client";

import { Column, TasksState } from "@/app/(poc)/dndList/page";
import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { cn } from "@/lib/utils";
import { DotIcon, GripVerticalIcon } from "lucide-react";

type Props = {
  initialData: TasksState;
};

export default function DndListMultipleColumns({ initialData }: Props) {
  const [state, setState] = React.useState(initialData);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    
    if (start === finish) {
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn: Column = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState: TasksState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
    }
    else {
      const newStart = {
        ...start,
        taskIds: newTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }


      const newState: TasksState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setState(newState);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return (
              <div className="w-1/3 pt-4 m-2 border" key={column.id}>
                <h3 className="mb-4 ml-2 font-bold">{column.title}</h3>
                <StrictModeDroppable droppableId={column.id}>
                  {(providedDroppable, snapshotDroppable) => (
                    <div
                      ref={providedDroppable.innerRef}
                      {...providedDroppable.droppableProps}
                      className={cn(
                        "p-2 border-t bg-white flex flex-col h-full",
                        snapshotDroppable.isDraggingOver && "bg-yellow-50"
                      )}
                    >
                      <div>
                        <p>{`Snapshot: ${column.title} `}</p>
                        <p>{` - isDraggingOver: ${snapshotDroppable.isDraggingOver} `}</p>
                        <p>{` - draggingOverWith: ${snapshotDroppable.draggingOverWith} `}</p>
                      </div>
                      {tasks.map((task, taskIndex) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={taskIndex}
                        >
                          {(providedDraggable, snapshotDraggable) => (
                            <div
                              className={cn(
                                "p-2 m-2 border bg-white flex items-center grow",
                                snapshotDraggable.isDragging && "bg-indigo-100"
                              )}
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                            >
                              {`${task.content}`}
                              {` - ${task.id} `}
                              {` - index: ${taskIndex} `}
                              {` - isDragging: ${snapshotDraggable.isDragging} `}
                              {` - draggingOver: ${snapshotDraggable.draggingOver} `}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {providedDroppable.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
}
