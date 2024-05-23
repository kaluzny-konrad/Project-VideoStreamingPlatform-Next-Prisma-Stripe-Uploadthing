"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseEditRequest,
  CourseEditValidator,
} from "@/lib/validators/course";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Photo } from "@prisma/client";
import Image from "next/image";
import PhotoUploadZone from "./PhotoUploadZone";
import PhotoDeleteButton from "./PhotoDeleteButton";

type Props = {
  courseId: string;
};

export default function CreatorCourseEditForm({ courseId }: Props) {
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

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
      categoryId: "",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [errors]);

  async function onSubmit(data: CourseEditRequest) {
    editCourse(data);
  }

  const { mutate: addPhoto } = trpc.photo.addPhotoToCourse.useMutation({
    onSuccess: (res) => {},
    onError: (err) => {
      toast.error(`Something went wrong during photo save.`);
    },
  });

  const { mutate: editCourse } = trpc.course.editCourse.useMutation({
    onSuccess: (res) => {
      if (photo?.id) {
        addPhoto({ courseId: res.id, photoId: photo.id });
      }

      router.push(`/creator/courses/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
    },
  });

  useEffect(() => {
    if (coursePreviousData) {
      setValue("name", coursePreviousData.name);
      setValue("description", coursePreviousData.description);
      setValue("price", coursePreviousData.price.toString());
      setValue("categoryId", coursePreviousData.categoryId.toString());
      setValue("courseId", coursePreviousData.id);
      setPhoto(coursePreviousData.Photos[0] ?? undefined);
    }
  }, [coursePreviousData, databaseLoading, databaseError, setValue]);

  if (categoriesLoading || databaseLoading) {
    return false;
  }

  if (categoriesError || databaseError) {
    toast.error(`Something went wrong: ${categoriesError?.message}`);
    return false;
  }

  function handlePhotoDeleted() {
    setPhoto(undefined);
  }

  function onBeforeUploadBegin() {
    setIsPhotoUploading(true);
  }

  function onClientUploadComplete(photo: Photo) {
    setPhoto(photo);
    setIsPhotoUploading(false);
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

        {photo?.url ? (
          <div>
            <Image
              src={photo.url}
              alt="Course image"
              width={600}
              height={400}
              className="h-auto w-auto"
              priority
            />
            <PhotoDeleteButton
              Photo={photo}
              onPhotoDeleted={handlePhotoDeleted}
            />
          </div>
        ) : (
          <PhotoUploadZone
            onClientUploadComplete={onClientUploadComplete}
            onBeforeUploadBegin={onBeforeUploadBegin}
          />
        )}

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
          <Button type="submit">Save course</Button>
        </div>
      </form>
    </div>
  );
}
