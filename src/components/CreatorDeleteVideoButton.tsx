"use client";

import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  videoId: string;
  subChapterId: string;
};

export default function CreatorDeleteVideoButton({ videoId, subChapterId }: Props) {
  const router = useRouter();

  const { mutate: deleteVideo } = trpc.video.deleteVideoFromCourse.useMutation(
    {
      onSuccess: () => {
        toast("Video deleted");
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleDeleteVideo = (videoId: string) => async () => {
    deleteVideo({
      videoId,
      subChapterId
    });
  };

  return (
    <Button
      onClick={handleDeleteVideo(videoId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
