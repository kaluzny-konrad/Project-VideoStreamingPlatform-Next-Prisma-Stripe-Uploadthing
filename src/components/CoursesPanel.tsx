"use client";

import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { useCategories } from "@/hooks/use-categories";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {};

export default function CoursesPanel({}: Props) {
  const { setActive, categoriesStateValue } = useCategories();

  const {
    data: allCategories,
    isLoading,
    error,
  } = trpc.category.getCategories.useQuery();

  if (error) {
    toast.error("Error loading categories");
    console.log(error);
  }

  return (
    <>
      <Button
        variant={`${
          categoriesStateValue.activeCategoryId ? "ghost" : "default"
        }`}
        className="justify-start w-full"
        onClick={() => setActive(null)}
      >
        All
      </Button>
      {isLoading ? (
        <>
          <Skeleton className="w-full h-6 mt-2 rounded-lg" />
          <Skeleton className="w-full h-6 mt-2 rounded-lg" />
          <Skeleton className="w-full h-6 mt-2 rounded-lg" />
        </>
      ) : (
        <>
          {allCategories?.map((category) => {
            return (
              <Button
                key={category.id}
                variant={`${
                  categoriesStateValue.activeCategoryId === category.id
                    ? "default"
                    : "ghost"
                }`}
                className="justify-start w-full"
                onClick={() => setActive(category.id)}
              >
                {category.name}
              </Button>
            );
          })}
        </>
      )}
    </>
  );
}
