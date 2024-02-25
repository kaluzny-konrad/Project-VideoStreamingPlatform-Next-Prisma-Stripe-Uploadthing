"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseEditRequest,
  CourseEditValidator,
} from "@/lib/validators/course";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import UploadImageZone from "./UploadImageZone";

type Props = {
  courseId: string;
};

export default function CreatorCourseEditForm({ courseId }: Props) {
  const {
    data: course,
    isLoading: loading,
    error,
  } = trpc.course.getCourse.useQuery({ courseId });

  const router = useRouter();
  const [imageId, setImageId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseEditRequest>({
    resolver: zodResolver(CourseEditValidator),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      imageId: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (course) {
      setImageId(course.imageId);
    }
  }, [course]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
        console.error(errors);
      }
    }
  }, [errors]);

  async function onSubmit(data: CourseEditRequest) {
    console.log(data);
    editCourse(data);
  }

  const { mutate: editCourse } = trpc.course.editCourse.useMutation({
    onSuccess: (res) => {
      router.push(`/creator/courses/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
    },
  });

  const imageUploaded = (args: { imageId: string }) => {
    console.log(args);
    setImageId(args.imageId);
  };

  return (
    <div>
      <form id="edit-course" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Course name</label>
          <input type="text" id="name" {...register("name")} value={course?.name ?? ""} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" {...register("description")} value={course?.description ?? ""} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" {...register("price")} value={course?.price ?? ""} />
        </div>

        <UploadImageZone imageUploaded={imageUploaded} />
        <div>
          <label htmlFor="imageId">Main image</label>
          <input
            type="text"
            id="imageId"
            value={imageId}
            {...register("imageId")}
          />
        </div>

        <div>
          <button type="submit">Save course</button>
        </div>
      </form>
    </div>
  );
}
