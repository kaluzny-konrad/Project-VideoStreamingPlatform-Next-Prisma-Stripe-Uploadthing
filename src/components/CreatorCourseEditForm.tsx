"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseEditRequest,
  CourseEditValidator,
} from "@/lib/validators/course";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import UploadImageZone from "./UploadImageZone";

type Props = {
  courseId: string;
};

export default function CreatorCourseEditForm({ courseId }: Props) {
  const router = useRouter();

  const {
    data: coursePreviousData,
    isLoading: databaseLoading,
    error: databaseError,
  } = trpc.course.getCourse.useQuery({ courseId });

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

  useEffect(() => {
    if (coursePreviousData && !databaseLoading && !databaseError) {
      setValue("name", coursePreviousData.name);
      setValue("description", coursePreviousData.description);
      setValue("price", coursePreviousData.price.toString());
      setValue("imageId", coursePreviousData.imageId);
      if (coursePreviousData.categoryId)
        setValue("categoryId", coursePreviousData.categoryId.toString());
      setValue("courseId", coursePreviousData.id);
    }
  }, [coursePreviousData, databaseLoading, databaseError, setValue]);

  const imageUploaded = (args: { imageId: string }) => {
    setValue("imageId", args.imageId);
  };

  if (categoriesLoading || databaseLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || databaseError) {
    toast.error(`Something went wrong: ${categoriesError?.message}`);
    console.error(categoriesError);
    return <div>Try again later</div>;
  }

  return (
    <div>
      <form id="edit-course" onSubmit={handleSubmit(onSubmit)}>
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
          <input type="number" id="price" {...register("price")} />
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
          <input type="hidden" id="courseId" {...register("courseId")} />
        </div>

        <div>
          <button type="submit">Save course</button>
        </div>
      </form>
    </div>
  );
}
