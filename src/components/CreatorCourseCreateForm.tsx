"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseCreateRequest,
  CourseCreateValidator,
} from "@/lib/validators/course";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadImageZone from "./UploadImageZone";

type Props = {};

export default function CreatorCourseCreateForm({}: Props) {
  const router = useRouter();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = trpc.category.getCategories.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CourseCreateRequest>({
    resolver: zodResolver(CourseCreateValidator),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      imageId: "",
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

  async function onSubmit(data: CourseCreateRequest) {
    console.log(data);
    createCourse(data);
  }

  const { mutate: createCourse } = trpc.course.createCourse.useMutation({
    onSuccess: (res) => {
      router.push(`/creator/courses/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
    },
  });

  const imageUploaded = (args: { imageId: string }) => {
    setValue("imageId", args.imageId);
  };

  if (categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError) {
    toast.error(`Something went wrong: ${categoriesError?.message}`);
    console.error(categoriesError);
    return <div>Try again later</div>;
  }

  return (
    <div>
      <form id="create-course" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Course name</label>
          <input type="text" id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" {...register("description")} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" step="0.01" id="price" {...register("price")} />
        </div>

        <UploadImageZone imageUploaded={imageUploaded} />
        <div>
          <label htmlFor="imageId">Main image</label>
          <input type="text" id="imageId" {...register("imageId")} />
        </div>

        <div>
          <label htmlFor="categoryId">Category</label>
          <select id="categoryId" {...register("categoryId")}>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Create course</button>
        </div>
      </form>
    </div>
  );
}
