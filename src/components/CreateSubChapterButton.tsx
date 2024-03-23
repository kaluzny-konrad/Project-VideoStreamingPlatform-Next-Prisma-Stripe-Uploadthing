"use client";

import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CreateChapterRequest, CreateSubChapterRequest } from "@/lib/validators/chapter";

type Props = {
  chaptersStateId: string;
  chapterId: string;
};

export default function CreateSubChapterButton({
  chaptersStateId,
  chapterId,
}: Props) {
  const router = useRouter();

  const { mutate: createSubChapter } = trpc.chapter.createSubChapter.useMutation({
    onSuccess: (res) => {
      toast.success("SubChapter added to course");
      router.refresh();
    },
  });

  async function onClick() {
    const data: CreateSubChapterRequest = {
      chaptersStateId: chaptersStateId,
      name: "New Sub Chapter",
    };
    console.log(data);
    createSubChapter(data);
  }

  return (
    <Button onClick={onClick}>
      Add Chapter
    </Button>
  );
}
