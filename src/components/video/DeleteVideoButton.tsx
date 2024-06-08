"use client";

import { Loader2Icon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { trpc } from "@/server/client";

import { Button } from "@/components/ui/button";

type Props = {
  videoId: string;
  onVideoDeleted: () => void;
};

export default function CreatorDeleteVideoButton({
  videoId,
  onVideoDeleted,
}: Props) {
  const router = useRouter();

  const {
    mutate: deleteVideo,
    error,
    isLoading,
  } = trpc.video.deleteVideo.useMutation({
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

  if (error) {
    toast.error("Error deleting video, try again later");
    console.error(error);
  }

  return (
    <Button
      onClick={handleDeleteVideo(videoId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
      disabled={isLoading}
      data-test="creator-videos-delete-button"
    >
      {isLoading ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        <TrashIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
