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
import CoursesPanel from "@/components/courses/CoursesPanel";

type Props = {};

export default function CoursesPanelMobileButton({}: Props) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  function closeModal() {
    dialogCloseRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({}))}>Filter</DialogTrigger>
      <DialogContent>
        <div className="p-4 bg-white rounded-xl lg:min-h-96">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Filter Courses
          </h2>
          <p className="mb-2 text-xs font-light uppercase text-slate-400">
            Category
          </p>
          <div className="flex flex-col gap-2">
            <CoursesPanel closeModal={closeModal} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild ref={dialogCloseRef}>
            <Button type="button" variant="secondary"
              data-test="courses-panel-mobile-button-close"
            >
              Show courses
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
