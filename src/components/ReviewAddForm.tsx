"use client";

import { CreateReviewRequest } from "@/lib/validators/review";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  courseId: string;
};

export default function ReviewAddForm({ courseId }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateReviewRequest>({
    defaultValues: {
      courseId,
      rating: "1",
      title: "",
      comment: "",
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

  async function onSubmit(data: CreateReviewRequest) {
    createReview(data);
  }

  const { mutate: createReview } = trpc.review.createReview.useMutation({
    onSuccess: () => {
      toast.success("Review added successfully");
      router.refresh();
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error);
    },
  });

  return (
    <div>
      <form id="review-add-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="rating">Rating</label>
        <input type="number" step="1" {...register("rating")} />
        <label htmlFor="title">Title</label>
        <input type="text" {...register("title")} />
        <label htmlFor="comment">Comment</label>
        <textarea {...register("comment")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
