"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  videoId: string;
};

export default function AdminVideoDeleteButton({ videoId }: Props) {
  const router = useRouter();

  const { mutate: deleteVideo } = trpc.admin.deleteVideo.useMutation({
    onSuccess: () => {
      toast("Video deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteVideo = (videoId: string) => async () => {
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
      data-test="admin-videos-delete-button"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
