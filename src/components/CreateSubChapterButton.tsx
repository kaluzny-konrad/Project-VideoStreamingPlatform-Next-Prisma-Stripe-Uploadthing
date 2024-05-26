"use client";

import { trpc } from "@/server/client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CreateSubChapterRequest } from "@/lib/validators/chapter";
import { SubChapter } from "@prisma/client";
import { PlusIcon } from "lucide-react";

type Props = {
  courseId: string;
  chapterId: string;
  pushSubChapterToChaptersState: (
    SubChapter: SubChapter,
    chapterId: string
  ) => void;
};

export default function CreateSubChapterButton({
  courseId,
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
      courseId: courseId,
      name: "New Sub Chapter",
      chapterId: chapterId,
    };
    createSubChapter(data);
  }

  return (
    <Button onClick={handleCreateSubChapter} size={"icon"}>
      <PlusIcon size={16} />
    </Button>
  );
}
