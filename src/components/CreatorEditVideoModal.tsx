"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Video } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { VideoEditRequest, VideoEditValidator } from "@/lib/validators/video";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { trpc } from "@/server/client";

type Props = {
  videoData: Video;
  setOpenEditVideoId: (videoId: string | undefined) => void;
};

export default function CreatorEditVideoModal({
  videoData,
  setOpenEditVideoId,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VideoEditRequest>({
    resolver: zodResolver(VideoEditValidator),
    defaultValues: {
      name: "",
      courseId: "",
      videoId: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
        console.error(errors);
      }
    }
  }, [errors]);

  async function onSubmit(data: VideoEditRequest) {
    console.log(data);
    editVideo(data);
    setOpenEditVideoId(undefined);
  }

  const { mutate: editVideo } = trpc.video.editVideo.useMutation({
    onSuccess: (res) => {
      toast.success(`Video edited.`);
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
    },
  });

  useEffect(() => {
    setValue("name", videoData.videoName);
    setValue("courseId", videoData.courseId);
    setValue("videoId", videoData.id);
  }, [videoData]);

  if (!videoData) return null;

  return (
    <>
      <div className="flex p-4">
        <p>Edit Video</p>
        <form
          id={`edit-video-${videoData.id}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="input"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="courseId">Course ID</label>
            <input
              type="text"
              id="courseId"
              {...register("courseId")}
              className="input"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="videoId">Video ID</label>
            <input
              type="text"
              id="videoId"
              {...register("videoId")}
              className="input"
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit">Save</Button>
            <Button onClick={() => setOpenEditVideoId(undefined)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
