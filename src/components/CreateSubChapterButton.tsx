"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CreateSubChapterRequest } from "@/lib/validators/chapter";
import { SubChapter } from "@prisma/client";
import { PlusIcon } from "lucide-react";

type Props = {
  chaptersStateId: string;
  chapterId: string;
  pushSubChapterToChaptersState: (
    SubChapter: SubChapter,
    chapterId: string
  ) => void;
};

export default function CreateSubChapterButton({
  chaptersStateId,
  chapterId,
  pushSubChapterToChaptersState,
}: Props) {
  const { mutate: createSubChapter } =
    trpc.chapter.createSubChapter.useMutation({
      onSuccess: (res) => {
        toast.success("SubChapter added to course");
        pushSubChapterToChaptersState(res, chapterId);
      },
    });

  async function handleCreateSubChapter() {
    const data: CreateSubChapterRequest = {
      chaptersStateId: chaptersStateId,
      name: "New Sub Chapter",
      chapterId: chapterId,
    };
    console.log(data);
    createSubChapter(data);
  }

  return (
    <Button onClick={handleCreateSubChapter} size={"icon"}>
      <PlusIcon size={16} />
    </Button>
  );
}
