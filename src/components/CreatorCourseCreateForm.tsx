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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "./ui/select";

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

  const form = useForm<CourseCreateRequest>({
    resolver: zodResolver(CourseCreateValidator),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      categoryId: categories?.[0].id,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

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

  function onBeforeUploadBegined() {
    setIsPhotoUploading(true);
  }

  function onClientUploadCompleted(photo: Photo) {
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
      <Form {...form}>
        <form id="create-course" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course name</FormLabel>
                <FormControl>
                  <Input placeholder="Course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Course description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Course price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
              onClientUploadCompleted={onClientUploadCompleted}
              onBeforeUploadBegined={onBeforeUploadBegined}
            />
          )}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit">Save course</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
