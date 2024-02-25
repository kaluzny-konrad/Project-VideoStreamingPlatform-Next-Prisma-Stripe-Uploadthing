"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  courseId: string;
  videoId: string;
};

export default function CreatorDeleteVideoButton({ courseId, videoId }: Props) {
  const { mutate: deleteVideo } = trpc.course.deleteVideoFromCourse.useMutation(
    {
      onSuccess: () => {
        console.log("Video deleted");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleDeleteVideo = (videoId: string) => async () => {
    deleteVideo({
      courseId,
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
