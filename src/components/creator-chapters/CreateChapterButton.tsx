"use client";

import { toast } from "sonner";
import { Chapter } from "@prisma/client";

import { trpc } from "@/server/client";
import { CreateChapterRequest } from "@/lib/validators/chapter";

import { Button } from "@/components/ui/button";

type Props = {
  courseId: string;
  pushChapterToChaptersState: (Chapter: Chapter) => void;
};

export default function CreateChapterButton({
  courseId,
  pushChapterToChaptersState,
}: Props) {
  const { mutate: createChapter } = trpc.chapter.createChapter.useMutation({
    onSuccess: (res) => {
      toast.success("Chapter added to course");
      pushChapterToChaptersState(res);
    },
  });

  async function handleCreateChapter() {
    const data: CreateChapterRequest = {
      courseId: courseId,
      name: "New Chapter",
    };
    createChapter(data);
  }

  return (
    <Button
      className="w-full mt-4"
      onClick={handleCreateChapter}
      data-test="create-chapter-button"
    >
      Add Chapter
    </Button>
  );
}
