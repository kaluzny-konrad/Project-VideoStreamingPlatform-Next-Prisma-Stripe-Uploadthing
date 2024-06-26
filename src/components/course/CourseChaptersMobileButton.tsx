"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import CourseChapters from "@/components/course/CourseChapters";

type Props = {
  courseId: string;
};

export default function CourseChaptersMobileButton({ courseId }: Props) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  function closeModal() {
    dialogCloseRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({}))}>Filter</DialogTrigger>
      <DialogContent>
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Course Content
          </h2>
          <p className="mb-2 text-xs font-light uppercase text-slate-400">
            Chapters
          </p>
          <div className="flex flex-col gap-2">
            <CourseChapters courseId={courseId} closeModal={closeModal} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild ref={dialogCloseRef}>
            <Button type="button" variant="secondary"
              data-test="course-chapters-mobile-button-close"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
