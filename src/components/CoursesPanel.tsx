"use client";

import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { useCategories } from "@/hooks/use-categories";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {
  closeModal?: () => void;
};

export default function CoursesPanel({
  closeModal,
}: Props) {
  const { setActive, categoriesStateValue } = useCategories();

  const {
    data: allCategories,
    isLoading,
    error,
  } = trpc.category.getActiveCategories.useQuery();

  if (error) {
    toast.error("Error loading categories");
  }

  function handleClick(categoryId: string | null) {
    setActive(categoryId);
    closeModal && closeModal();
  }

  return (
    <>
      <Button
        variant={`${
          categoriesStateValue.activeCategoryId ? "ghost" : "default"
        }`}
        className="justify-start w-full"
        onClick={() => handleClick(null)}
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
                onClick={() => handleClick(category.id)}
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
