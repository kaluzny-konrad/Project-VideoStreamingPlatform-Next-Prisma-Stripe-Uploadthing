"use client";

import { DeleteSubChapterRequest } from "@/lib/validators/chapter";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

type Props = {
  subChapterId: string;
  deleteSubChapterFromChaptersState: (subChapterId: string) => void;
  disabled: boolean;
};

export default function DeleteSubChapterButton({
  subChapterId,
  deleteSubChapterFromChaptersState,
  disabled,
}: Props) {
  const { mutate: deleteSubChapter } =
    trpc.chapter.deleteSubChapter.useMutation({
      onSuccess: () => {
        toast.success("SubChapter deleted");
        deleteSubChapterFromChaptersState(subChapterId);
      },
    });

  async function handleDeleteSubChapter() {
    const data: DeleteSubChapterRequest = {
      id: subChapterId,
    };
    deleteSubChapter(data);
  }

  return (
    <Button
      onClick={handleDeleteSubChapter}
      variant={disabled ? "ghost" : "destructive"}
      className="mt-2"
      disabled={disabled}
      size={"icon"}
      data-test="delete-sub-chapter-button"
    >
      <Trash2Icon size={16} />
    </Button>
  );
}
