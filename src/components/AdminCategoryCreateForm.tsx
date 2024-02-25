"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryCreationRequest,
  CategoryValidator,
} from "@/lib/validators/category";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

export default function CreatorCategoryCreateForm({}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreationRequest>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      name: "",
      slug: "",
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

  async function onSubmit(data: CategoryCreationRequest) {
    console.log(data);
    createCategory(data);
  }

  const { mutate: createCategory } = trpc.admin.createCategory.useMutation({
    onSuccess: (res) => {
      router.push(`/admin/categories/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
    },
  });

  return (
    <div>
      <form id="create-category" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Category name</label>
          <input type="text" id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input type="text" id="slug" {...register("slug")} />
        </div>

        <div>
          <button type="submit">Create category</button>
        </div>
      </form>
    </div>
  );
}
