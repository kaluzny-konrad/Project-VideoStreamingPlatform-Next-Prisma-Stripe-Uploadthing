"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CoursesPanel from "./CoursesPanel";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useRef } from "react";

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
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
