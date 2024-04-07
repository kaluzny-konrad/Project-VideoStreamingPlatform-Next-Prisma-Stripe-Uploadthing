"use client";

import { CreateReviewRequest } from "@/lib/validators/review";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Review } from "@prisma/client";

type Props = {
  courseId: string;
  setUserReview: (review: Review | null) => void;
  optimisticUpdateLoading: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function ReviewAddForm({
  courseId,
  setUserReview,
  optimisticUpdateLoading,
  setOptimisticUpdateLoading,
}: Props) {
  const reviewForm = useForm<CreateReviewRequest>({
    defaultValues: {
      courseId,
      rating: "5",
      title: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (Object.keys(reviewForm.formState.errors).length) {
      const errors = reviewForm.formState.errors;
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
        console.error(errors);
      }
    }
  }, [reviewForm.formState.errors]);

  async function onSubmit(newReviewFormData: CreateReviewRequest) {
    console.log("newReviewFormData", newReviewFormData);
    
    setOptimisticUpdateLoading(true);
    const optimisticReview: Review = {
      id: "optimistic",
      title: newReviewFormData.title || null,
      comment: newReviewFormData.comment || null,
      rating: parseInt(newReviewFormData.rating, 10),
      userId: "optimistic",
      courseId: newReviewFormData.courseId,
    };
    setUserReview(optimisticReview);
    createReview(newReviewFormData);
  }

  const { mutate: createReview } = trpc.review.createReview.useMutation({
    onSuccess: (newReviewDb: Review) => {
      toast.success("Review added successfully");
      setUserReview(newReviewDb);
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.error(error);
      setUserReview(null);
    },
    onSettled: () => {
      setOptimisticUpdateLoading(false);
    },
  });

  return (
    <div>
      <Form {...reviewForm}>
        <form
          id="review-add-form"
          onSubmit={reviewForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={reviewForm.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="rating">Rating</FormLabel>
                <FormControl>
                  <Input type="number" step="1" {...field} />
                </FormControl>
                <FormDescription>Rating from 1 to 5</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={reviewForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={reviewForm.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={optimisticUpdateLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
