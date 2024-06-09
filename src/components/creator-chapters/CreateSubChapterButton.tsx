"use client";

import { toast } from "sonner";
import { SubChapter, Video } from "@prisma/client";
import { PlusIcon } from "lucide-react";

import { trpc } from "@/server/client";
import { CreateSubChapterRequest } from "@/lib/validators/chapter";

import { Button } from "@/components/ui/button";

type Props = {
  courseId: string;
  chapterId: string;
  pushSubChapterToChaptersState: (
    SubChapter: SubChapter & { Video: Video | null },
    chapterId: string
  ) => void;
  disabled: boolean;
};

export default function CreateSubChapterButton({
  courseId,
  chapterId,
  pushSubChapterToChaptersState,
  disabled,
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
    <Button
      onClick={handleCreateSubChapter}
      size={"icon"}
      className="button-default-size"
      disabled={disabled}
    >
      <PlusIcon className="button-default-icon-size" />
    </Button>
  );
}
