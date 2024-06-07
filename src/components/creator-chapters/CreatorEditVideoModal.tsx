"use client";

import { useEffect } from "react";
import { Video } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { VideoEditRequest, VideoEditValidator } from "@/lib/validators/video";
import { trpc } from "@/server/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  videoData: Video;
  setOpenEditVideoId: (videoId: string | undefined) => void;
};

export default function CreatorEditVideoModal({
  videoData,
  setOpenEditVideoId,
}: Props) {
  const router = useRouter();

  const form = useForm<VideoEditRequest>({
    resolver: zodResolver(VideoEditValidator),
    defaultValues: {
      name: "",
      subChapterId: "",
      videoId: "",
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

  async function onSubmit(data: VideoEditRequest) {
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
    form.setValue("name", videoData.videoName);
    form.setValue("subChapterId", videoData.subChapterId);
    form.setValue("videoId", videoData.id);
  }, [videoData, form.setValue, form]);

  if (!videoData) return null;

  return (
    <Form {...form}>
      <form
        id={`edit-video-${videoData.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subChapterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="subChapterId">Course ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Course ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="videoId">Video ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Video ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" data-test="creator-videos-edit-button">
            Save
          </Button>
          <Button
            onClick={() => setOpenEditVideoId(undefined)}
            data-test="creator-videos-cancel-button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
