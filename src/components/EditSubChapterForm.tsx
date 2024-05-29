"use client";

import { useForm } from "react-hook-form";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UpdateSubChapterRequest } from "@/lib/validators/chapter";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Props = {
  courseId: string;
  subChapterId: string;
};

export default function EditSubChapterForm({ courseId, subChapterId }: Props) {
  const router = useRouter();

  const {
    data: chaptersStatePreviousData,
    isLoading: databaseLoading,
    error: databaseError,
  } = trpc.chapter.getChaptersState.useQuery({ courseId });

  const form = useForm<UpdateSubChapterRequest>({
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

  async function onSubmit(data: UpdateSubChapterRequest) {
    updateSubChapter(data);
  }

  const { mutate: updateSubChapter } =
    trpc.chapter.updateSubChapter.useMutation({
      onSuccess: () => {
        toast.success("SubChapter updated successfully");
        router.refresh();
      },
      onError: (error) => {
        toast.error(`Something went wrong: ${error.message}`);
        console.error(error);
      },
    });

  useEffect(() => {
    if (chaptersStatePreviousData) {
      const subChapter = chaptersStatePreviousData.SubChapters.find(
        (subChapter) => subChapter.id === subChapterId
      );

      if (subChapter) {
        form.setValue("id", subChapter.id);
        form.setValue("name", subChapter.name);
      }
    }
  }, [chaptersStatePreviousData, form.setValue, subChapterId, form]);

  if (databaseLoading) {
    return <div>Loading...</div>;
  }

  if (databaseError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <Form {...form}>
      <form
        id="edit-subchapter"
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
                <Input placeholder="Sub Chapter name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" data-test="creator-subchapter-edit-button">
          Update SubChapter
        </Button>
      </form>
    </Form>
  );
}
