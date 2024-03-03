import DndListMultipleColumns from "@/components/poc/DndListMultipleColumns";
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
      column2: {
        id: "column2",
        title: "In Progress",
        taskIds: [],
      },
      column3: {
        id: "column3",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column1", "column2", "column3"],
  };

  return <DndListMultipleColumns initialData={initialData} />;
}
