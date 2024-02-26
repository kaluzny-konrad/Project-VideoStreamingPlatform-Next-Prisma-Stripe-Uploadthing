"use client";

import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { useCategories } from "@/hooks/use-categories";

type Props = {};

export default function CoursesPanel({}: Props) {
  const {
    isMounted,
    initCategoryIds,
    setActive,
    clearStates,
    isActive,
    anyActive,
  } = useCategories();
  const {
    data: categories,
    isLoading: loading,
    error,
  } = trpc.category.getCategories.useQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isMounted()) {
    initCategoryIds(categories.map((category) => category.id));
  }

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Filter Courses</h2>
      <p className="mb-2 text-xs font-light uppercase text-slate-400">
        Category
      </p>
      <div className="flex flex-col gap-2">
        <Button
          variant={`${anyActive() ? "ghost" : "default"}`}
          className="justify-start w-full"
          onClick={clearStates}
        >
          All
        </Button>
        {categories?.map((category) => {
          return (
            <Button
              key={category.id}
              variant={`${isActive(category.id) ? "default" : "ghost"}`}
              className="justify-start w-full"
              onClick={() => setActive(category.id)}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
