"use client";

import { Review } from "@prisma/client";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { EditIcon } from "lucide-react";

import { trpc } from "@/server/client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { EditReviewRequest } from "@/lib/validators/review";

type Props = {
  reviewId: string;
  setUserReview: (review: Review | null) => void;
  initialReview: Review;
  optimisticUpdateLoading: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function ReviewEditButton({
  reviewId,
  setUserReview,
  initialReview,
  optimisticUpdateLoading,
  setOptimisticUpdateLoading,
}: Props) {
  const form = useForm<EditReviewRequest>({
    defaultValues: {
      reviewId,
      rating: initialReview.rating.toString(),
      title: initialReview.title || "",
      comment: initialReview.comment || "",
    },
  });

  useEffect(() => {
    form.reset({
      reviewId,
      rating: initialReview.rating.toString(),
      title: initialReview.title || "",
      comment: initialReview.comment || "",
    });
  }, [initialReview, form, reviewId]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      const errors = form.formState.errors;
      for (const [key, value] of Object.entries(errors)) {
        toast.error(`Something went wrong: ${value.message}`);
        console.error(errors);
      }
    }
  }, [form.formState.errors]);

  const { mutate: editReview, isLoading: editReviewLoading } =
    trpc.review.editReview.useMutation({
      onSuccess: (updatedReviewDb: Review) => {
        toast.success("Review edited successfully");
        setUserReview(updatedReviewDb);
      },
      onError: (error) => {
        toast.error("Something went wrong");
        console.error(error);
        setUserReview(initialReview);
      },
      onSettled: () => {
        setOptimisticUpdateLoading(false);
      },
    });
    
  function isReviewChanged(updatedReviewFormData: EditReviewRequest) {
    return (
      updatedReviewFormData.rating !== initialReview.rating.toString() ||
      updatedReviewFormData.title !== initialReview.title ||
      updatedReviewFormData.comment !== initialReview.comment
    );
  }

  async function onSubmit(updatedReviewFormData: EditReviewRequest) {
    // Check if review has changed
    if (!isReviewChanged(updatedReviewFormData)) {
      toast.info("No changes detected");
      closeDialogButtonRef.current?.click();
      return;
    }

    // Optimistic update
    setOptimisticUpdateLoading(true);
    const optimisticReview: Review = {
      ...initialReview,
      rating: parseInt(updatedReviewFormData.rating, 10),
      title: updatedReviewFormData.title || "",
      comment: updatedReviewFormData.comment || "",
    };
    setUserReview(optimisticReview);
    closeDialogButtonRef.current?.click();

    // Real update
    editReview(updatedReviewFormData);
  }

  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={optimisticUpdateLoading}
          size={"icon"}
          variant={"ghost"}
          className="h-6 w-6"
          data-test="edit-video-modal-trigger"
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit review</DialogTitle>
          <DialogDescription>
            Make changes to your review here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="review-add-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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

            <DialogFooter className="grid grid-cols-2 gap-2">
              <DialogClose asChild ref={closeDialogButtonRef}>
                <Button
                  variant="secondary"
                  data-test="review-edit-cancel-button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={editReviewLoading}
                data-test="review-edit-button"
              >
                {(editReviewLoading && "Saving...") || "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
