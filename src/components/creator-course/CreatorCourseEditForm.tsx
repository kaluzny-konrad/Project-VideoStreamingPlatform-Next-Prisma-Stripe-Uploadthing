"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Photo } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import {
  CourseEditRequest,
  CourseEditValidator,
} from "@/lib/validators/course";
import { trpc } from "@/server/client";

import PhotoUploadZone from "@/components/photo/PhotoUploadZone";
import PhotoDeleteButton from "@/components/photo/PhotoDeleteButton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

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

  const form = useForm<CourseEditRequest>({
    resolver: zodResolver(CourseEditValidator),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

  async function onSubmit(data: CourseEditRequest) {
    editCourse(data);
  }

  const { mutate: addPhoto } = trpc.photo.addPhotoToCourse.useMutation({
    onSuccess: (res) => {},
    onError: (err) => {
      toast.error(`Something went wrong during photo save.`);
    },
  });

  const {
    mutate: editCourse,
    error,
    isLoading,
  } = trpc.course.editCourse.useMutation({
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
      form.setValue("courseId", coursePreviousData.id);
      form.setValue("name", coursePreviousData.name);
      form.setValue("description", coursePreviousData.description);
      form.setValue("price", coursePreviousData.price.toString());
      form.setValue("categoryId", coursePreviousData.Categories[0].id);
      setPhoto(coursePreviousData.Photos[0] ?? undefined);
    }
  }, [coursePreviousData, databaseLoading, databaseError, form.setValue, form]);

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

  function onBeforeUploadBegined() {
    setIsPhotoUploading(true);
  }

  function onClientUploadCompleted(photo: Photo) {
    setPhoto(photo);
    setIsPhotoUploading(false);
  }

  return (
    <Form {...form}>
      <form
        id="edit-course"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
          <div className="relative">
            <div className="absolute top-0">
              <PhotoDeleteButton
                Photo={photo}
                onPhotoDeleted={handlePhotoDeleted}
              />
            </div>
            <Image
              src={photo.url}
              alt="Course image"
              width={600}
              height={400}
              className="aspect-video object-cover"
              priority
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
                defaultValue={coursePreviousData.Categories[0].id}
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

        <div className="flex gap-2 justify-end">
          <Link
            href={`/creator/courses/${courseId}`}
            className={buttonVariants({ variant: "ghost" })}
          >
            Back to course
          </Link>

          <Button
            type="submit"
            data-test="creator-course-edit-button"
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            Save course
          </Button>
        </div>
      </form>
    </Form>
  );
}
