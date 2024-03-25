"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UpdateSubChapterRequest } from "@/lib/validators/chapter";
import { toast } from "sonner";
import { Button } from "./ui/button";
import UploadVideoZone from "./UploadVideoZone";
import SubChapterVideo from "./SubChapterVideo";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateSubChapterRequest>({
    defaultValues: {
      id: "",
      name: "",
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

  async function onSubmit(data: UpdateSubChapterRequest) {
    console.log(data);
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
        setValue("id", subChapter.id);
        setValue("name", subChapter.name);
      }
    }
  }, [chaptersStatePreviousData]);

  if (databaseLoading) {
    return <div>Loading...</div>;
  }

  if (databaseError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <form id="edit-subchapter" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
        </div>

        <Button type="submit">Update SubChapter</Button>
      </form>
    </div>
  );
}
