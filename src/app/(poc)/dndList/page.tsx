import DndListHandle from "@/components/poc/DndListHandle";
import React from "react";

type Props = {};

export interface Task {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Tasks {
  [id: string]: Task;
}

export interface Columns {
  [id: string]: Column;
}

export interface TasksState {
  tasks: Tasks;
  columns: Columns;
  columnOrder: string[];
}

export default function dndList({}: Props) {
  const initialData: TasksState = {
    tasks: {
      task1: { id: "task1", content: "Task 1" },
      task2: { id: "task2", content: "Task 2" },
      task3: { id: "task3", content: "Task 3" },
    },
    columns: {
      column1: {
        id: "column1",
        title: "ToDo",
        taskIds: ["task1", "task2", "task3"],
      },
    },
    columnOrder: ["column1"],
  };

  return <DndListHandle initialData={initialData} />;
}
