"use client";

import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CreateChapterRequest } from "@/lib/validators/chapter";

type Props = {
  courseId: string;
};

export default function CreateChapterButton({ courseId }: Props) {
  const router = useRouter();

  const { data: chaptersState, isLoading: chaptersStateLoading } =
    trpc.chapter.getChaptersState.useQuery({
      courseId,
    });

  const { mutate: createChapter } = trpc.chapter.createChapter.useMutation({
    onSuccess: (res) => {
      toast.success("Chapter added to course");
      router.refresh();
    },
  });

  async function onClick() {
    const data: CreateChapterRequest = {
      chaptersStateId: chaptersState?.id ?? "",
      name: "New Chapter",
    };
    console.log(data);
    createChapter(data);
  }

  return (
    <Button onClick={onClick} disabled={chaptersStateLoading}>
      Add Chapter
    </Button>
  );
}
