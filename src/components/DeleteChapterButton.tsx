import React from "react";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { DeleteChapterRequest } from "@/lib/validators/chapter";
import { toast } from "sonner";

type Props = {
  chapterId: string;
  deleteChapterFromChaptersState: (chapterId: string) => void;
  disabled: boolean;
};

export default function DeleteChapterButton({
  chapterId,
  deleteChapterFromChaptersState,
  disabled,
}: Props) {
  const { mutate: deleteChapter } = trpc.chapter.deleteChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapter deleted");
      deleteChapterFromChaptersState(chapterId);
    },
  });

  async function handleDeleteChapter() {
    const data: DeleteChapterRequest = {
      id: chapterId,
    };
    deleteChapter(data);
  }

  return (
    <Button
      onClick={handleDeleteChapter}
      variant={disabled ? "ghost" : "destructive"}
      className="mt-2"
      disabled={disabled}
    >
      Delete Chapter
    </Button>
  );
}
