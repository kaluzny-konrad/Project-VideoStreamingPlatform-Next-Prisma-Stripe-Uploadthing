"use client";

import { Column, TasksState } from "@/app/(poc)/dndList/page";
import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { cn } from "@/lib/utils";

type Props = {
  initialData: TasksState;
};

export default function DndList({ initialData }: Props) {
  const [state, setState] = React.useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";
  };

  const onDragUpdate = (update: any) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result: any) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

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

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn: Column = {
      ...column,
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
  };

  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return (
            <div className="pt-4 border" key={column.id}>
              <h3 className="mb-4 ml-2 font-bold">{column.title}</h3>
              <StrictModeDroppable droppableId={column.id}>
                {(providedDroppable, snapshotDroppable) => (
                  <div
                    ref={providedDroppable.innerRef}
                    {...providedDroppable.droppableProps}
                    className={cn(
                      "p-2 border-t bg-white",
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
                              "p-2 m-2 border bg-white",
                              snapshotDraggable.isDragging && "bg-indigo-100"
                            )}
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <p>
                              {`${task.content}`}
                              {` - ${task.id} `}
                              {` - index: ${taskIndex} `}
                            </p>
                            <p>{` - isDragging: ${snapshotDraggable.isDragging} `}</p>
                            <p>{` - draggingOver: ${snapshotDraggable.draggingOver} `}</p>
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
      </DragDropContext>
    </>
  );
}
