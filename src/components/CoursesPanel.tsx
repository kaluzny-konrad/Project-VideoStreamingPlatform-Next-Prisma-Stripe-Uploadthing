"use client";

import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";

type Props = {};

export default function CoursesPanel({}: Props) {
  const {
    data: categories,
    isLoading: loading,
    error,
  } = trpc.category.getCategories.useQuery();

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Filter Courses</h2>
      <p className="mb-2 text-xs font-light uppercase text-slate-400">
        Category
      </p>
      <div className="flex flex-col">
        <Button variant="ghost" className="justify-start w-full">
          All
        </Button>
        {categories?.map((category) => {
          return (
            <Button
              key={category.id}
              variant="ghost"
              className="justify-start w-full"
            >
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
