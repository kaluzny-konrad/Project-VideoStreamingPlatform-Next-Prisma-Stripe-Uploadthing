"use client";

import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import { DeleteSubChapterRequest } from "@/lib/validators/chapter";
import { trpc } from "@/server/client";

import { Button } from "@/components/ui/button";

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
      onSuccess: (res) => {
        toast.success("SubChapter deleted");
        deleteSubChapterFromChaptersState(subChapterId);
        if (res.Video) deleteVideo({ id: res.Video.id });
      },
    });

  const { mutate: deleteVideo } = trpc.video.deleteVideo.useMutation({
    onSuccess: () => {
      toast.success("Video deleted");
    },
    onError: (error) => {
      console.error(error);
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
      variant={"destructive"}
      className="button-default-size"
      disabled={disabled}
      size={"icon"}
      data-test="delete-sub-chapter-button"
    >
      <Trash2Icon className="button-default-icon-size" />
    </Button>
  );
}
