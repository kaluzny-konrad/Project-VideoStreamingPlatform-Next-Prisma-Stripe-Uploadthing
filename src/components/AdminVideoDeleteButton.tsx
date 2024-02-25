"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  videoId: string;
};

export default function AdminVideoDeleteButton({ videoId }: Props) {
  const router = useRouter();

  const { mutate: deleteVideo } = trpc.admin.deleteVideo.useMutation({
    onSuccess: () => {
      console.log("Video deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteVideo = (videoId: string) => async () => {
    console.log("Deleting video", videoId);

    deleteVideo({
      videoId,
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
