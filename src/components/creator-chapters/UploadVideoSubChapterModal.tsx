"use client";

import { useEffect, useState } from "react";
import { SubChapter, Video } from "@prisma/client";
import { CircleDashedIcon, FileIcon, MoveRightIcon, UploadIcon, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { trpc } from "@/server/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreatorDeleteVideoButton from "@/components/video/DeleteVideoButton";
import VideoUploadZone from "@/components/video/VideoUploadZone";

type Props = {
  subChapter: SubChapter;
  onChange: (video: Video | undefined, isLoading: boolean) => void;
  disabled: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function UploadVideoSubChapterModal({
  subChapter,
  onChange,
  disabled,
  setOptimisticUpdateLoading,
}: Props) {
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: connectVideoWithCourse } =
    trpc.video.addVideoToCourse.useMutation({
      onSuccess: (res) => {
        toast.success("Video added to course");
        setVideoId(res.id);
      },
      onError: (error) => {
        toast.error("Something went wrong");
        setVideoId(undefined);
      },
      onSettled: () => {
        setOptimisticUpdateLoading(false);
        setIsLoading(false);
      },
    });

  function onBeforeUploadBegined() {
    setIsLoading(true);
    setOptimisticUpdateLoading(true);
  }

  function onClientUploadCompleted(video: Video) {
    setVideoId(video.id);
    connectVideoWithCourse({ subChapterId: subChapter.id, videoId: video.id });
  }

  function handleVideoDeleted() {
    toast.success("Video deleted");
    setVideoId(undefined);
  }

  useEffect(() => {
    if (subChapter.videoId) {
      setVideoId(subChapter.videoId);
    }
  }, [subChapter]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="h-6 w-6"
          data-test="edit-chapter-modal-trigger"
          disabled={!isLoading && disabled}
        >
          {isLoading ? (
            <CircleDashedIcon className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {videoId ? (
                <VideoIcon className="h-4 w-4" />
              ) : (
                <UploadIcon className="h-4 w-4" />
              )}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>
          {videoId ? "Uploaded video" : "Upload video"} - {subChapter.name}
        </DialogTitle>
        {videoId ? (
          <CreatorDeleteVideoButton
            videoId={videoId}
            onVideoDeleted={handleVideoDeleted}
          />
        ) : (
          <VideoUploadZone
            onClientUploadCompleted={onClientUploadCompleted}
            onBeforeUploadBegined={onBeforeUploadBegined}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
