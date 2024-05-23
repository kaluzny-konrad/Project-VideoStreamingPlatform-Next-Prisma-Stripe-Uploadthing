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
import { Photo } from "@prisma/client";
import Image from "next/image";
import PhotoDeleteButton from "./PhotoDeleteButton";
import PhotoUploadZone from "./PhotoUploadZone";
import { Button } from "./ui/button";

type Props = {};

export default function CreatorCourseCreateForm({}: Props) {
  const router = useRouter();
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

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
      categoryId: categories?.[0].id,
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [errors]);

  async function onSubmit(data: CourseCreateRequest) {
    createCourse(data);
  }

  const { mutate: addPhoto } = trpc.photo.addPhotoToCourse.useMutation({
    onSuccess: (res) => {},
    onError: (err) => {
      toast.error(`Something went wrong during photo save.`);
    },
  });

  const { mutate: createCourse } = trpc.course.createCourse.useMutation({
    onSuccess: (res) => {
      if (photo?.id) {
        addPhoto({ courseId: res.id, photoId: photo.id });
      }

      router.push(`/creator/courses/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Something went wrong during save.`);
    },
  });

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

  if (categoriesLoading) {
    return false;
  }

  if (categoriesError) {
    toast.error(`Something went wrong: ${categoriesError?.message}`);
    return false;
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
