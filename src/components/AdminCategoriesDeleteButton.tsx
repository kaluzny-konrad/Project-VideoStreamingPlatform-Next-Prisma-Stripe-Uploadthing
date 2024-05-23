"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  categoryId: string;
};

export default function AdminCategoriesDeleteButton({ categoryId }: Props) {
  const router = useRouter();

  const { mutate: deleteCategory } = trpc.admin.deleteCategory.useMutation({
    onSuccess: () => {
      toast("Category deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteCategory = (categoryId: string) => async () => {
    deleteCategory({
      categoryId,
    });
  };

  return (
    <Button
      onClick={handleDeleteCategory(categoryId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
