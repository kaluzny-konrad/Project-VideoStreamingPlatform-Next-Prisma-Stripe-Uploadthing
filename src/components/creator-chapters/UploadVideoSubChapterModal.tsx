"use client";

import { useEffect, useState } from "react";
import { SubChapter, Video } from "@prisma/client";
import {
  CircleDashedIcon,
  FileIcon,
  MoveRightIcon,
  UploadIcon,
  VideoIcon,
} from "lucide-react";
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
  subChapter: SubChapter & { Video: Video | null };
  onChange: (video: Video | null) => void;
  disabled: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function UploadVideoSubChapterModal({
  subChapter,
  onChange,
  disabled,
  setOptimisticUpdateLoading,
}: Props) {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);

  const { mutate: connectVideoWithCourse } =
    trpc.video.addVideoToCourse.useMutation({
      onSuccess: (res) => {
        toast.success("Video added to course");
        onChange(res);
        setVideo(res);
      },
      onError: (error) => {
        toast.error("Something went wrong");
        onChange(null);
        setVideo(null);
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
    // Optimistic update
    setVideo(video);

    // Real update
    connectVideoWithCourse({ subChapterId: subChapter.id, videoId: video.id });
  }

  function handleVideoDeleted() {
    toast.success("Video deleted");
    onChange(null);
    setVideo(null);
  }

  function handleUploadProgress(progress: number) {
    setVideoUploadProgress(progress);
  }

  useEffect(() => {
    if (subChapter.videoId) {
      setVideo(subChapter.Video);
    }
  }, [subChapter]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="button-default-size"
          data-test="edit-chapter-modal-trigger"
          disabled={disabled}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs">{videoUploadProgress}%</p>
              <CircleDashedIcon className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              {video ? (
                <VideoIcon className="button-default-icon-size" />
              ) : (
                <UploadIcon className="button-default-icon-size" />
              )}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        {video ? (
          <>
            <DialogTitle>Uploaded video - {subChapter.name}</DialogTitle>
            <div>
              <div className="flex items-center gap-2">
                <FileIcon className="button-default-icon-size" />
                <p>{video.fileName}</p>
                <CreatorDeleteVideoButton
                  videoId={video.id}
                  onVideoDeleted={handleVideoDeleted}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogTitle>Upload video - {subChapter.name}</DialogTitle>
            <VideoUploadZone
              onClientUploadCompleted={onClientUploadCompleted}
              onBeforeUploadBegined={onBeforeUploadBegined}
              handleUploadProgress={handleUploadProgress}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
