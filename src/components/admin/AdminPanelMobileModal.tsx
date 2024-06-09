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
import AdminPanel from "./AdminPanel";

type Props = {};

export default function AdminPanelMobileModal({}: Props) {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  function closeModal() {
    dialogCloseRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({}))}>Admin Panel</DialogTrigger>
      <DialogContent>
        <AdminPanel onLinkClick={closeModal} />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild ref={dialogCloseRef}>
            <Button
              type="button"
              variant="secondary"
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
