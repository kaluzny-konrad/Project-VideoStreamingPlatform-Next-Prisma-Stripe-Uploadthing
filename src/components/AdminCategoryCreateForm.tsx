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

export default function CreatorCategoryCreateForm() {
  const router = useRouter();

  const form = useForm<CategoryCreationRequest>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

  async function onSubmit(data: CategoryCreationRequest) {
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
    <Form {...form}>
      <form
        id="create-category"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Category name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="slug">Slug</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" data-test="admin-categories-create-button">
          Create category
        </Button>
      </form>
    </Form>
  );
}
