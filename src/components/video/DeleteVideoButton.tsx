"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { trpc } from "@/server/client";

import { Button } from "@/components/ui/button";

type Props = {
  videoId: string;
  onVideoDeleted: () => void;
};

export default function CreatorDeleteVideoButton({
  videoId, onVideoDeleted
}: Props) {
  const router = useRouter();

  const { mutate: deleteVideo } = trpc.video.deleteVideo.useMutation({
    onSuccess: () => {
      onVideoDeleted();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteVideo = (videoId: string) => async () => {
    deleteVideo({
      id: videoId,
    });
  };

  return (
    <Button
      onClick={handleDeleteVideo(videoId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
      data-test="creator-videos-delete-button"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
