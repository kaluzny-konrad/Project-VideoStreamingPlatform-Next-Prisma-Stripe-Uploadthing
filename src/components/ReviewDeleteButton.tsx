"use client";

import { trpc } from "@/server/client";
import { Review } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRef } from "react";
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
import { buttonVariants } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  reviewId: string;
  setUserReview: (review: Review | null) => void;
  initialReview: Review;
  optimisticUpdateLoading: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function ReviewDeleteButton({
  reviewId,
  setUserReview,
  initialReview,
  optimisticUpdateLoading,
  setOptimisticUpdateLoading,
}: Props) {
  const { mutate: deleteReview } = trpc.review.deleteReview.useMutation({
    onSuccess: () => {
      toast.success("Review deleted successfully");
      setUserReview(null);
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

  const handleOptimisticDelete = async () => {
    console.log("delete review", reviewId);

    setOptimisticUpdateLoading(true);
    setUserReview(null);
    deleteReview({ reviewId });
  };

  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger
        disabled={optimisticUpdateLoading}
        className={buttonVariants({ variant: "destructive", size: "icon" })}
      >
        <TrashIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete review</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this review? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleOptimisticDelete}
            disabled={optimisticUpdateLoading}
            variant={"destructive"}
          >
            Delete review
          </Button>
          <DialogClose asChild ref={closeDialogButtonRef}>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
