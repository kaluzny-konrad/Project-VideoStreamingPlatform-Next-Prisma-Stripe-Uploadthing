"use client";

import { EditIcon } from "lucide-react";
import { Video } from "@prisma/client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { VideoEditRequest, VideoEditValidator } from "@/lib/validators/video";
import { trpc } from "@/server/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  video: Video;
};

export default function CreatorEditVideoModalTrigger({ video }: Props) {
  const router = useRouter();

  const form = useForm<VideoEditRequest>({
    resolver: zodResolver(VideoEditValidator),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

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

  async function onSubmit(data: VideoEditRequest) {
    editVideo(data);
  }

  useEffect(() => {
    form.setValue("id", video.id);
    form.setValue("name", video.videoName);
  }, [video, form.setValue, form]);

  if (!video) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="h-6 w-6"
          data-test="creator-videos-edit-button"
        >
          <EditIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id={`edit-video-${video.id}`}
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={'ghost'} data-test="creator-videos-cancel-button">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
