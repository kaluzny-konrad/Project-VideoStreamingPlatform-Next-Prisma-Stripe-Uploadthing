"use client";

import { trpc } from "@/server/client";
import { useCategories } from "@/hooks/use-categories";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";

type Props = {
  closeModal?: () => void;
};

export default function CoursesPanel({ closeModal }: Props) {
  const { toggleActive, categoriesStateValue } = useCategories();

  const {
    data: allCategories,
    isLoading,
    error,
  } = trpc.category.getActiveCategories.useQuery();

  if (error) {
    toast.error("Error loading categories");
  }

  return (
    <>
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
              <div className="flex items-center space-x-2" key={category.id}>
                <Checkbox
                  id={category.id}
                  checked={categoriesStateValue.activeCategoryIds.includes(
                    category.id
                  )}
                  onCheckedChange={() => toggleActive(category.id)}
                />
                <Label htmlFor={category.id} className="">
                  {category.name}
                </Label>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
