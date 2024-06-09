"use client";

import { InfoIcon, ListIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  onLinkClick?: () => void;
};

export default function CreatorPanel({ onLinkClick }: Props) {
  return (
    <div className="min-h-96 rounded-xl bg-white p-4">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Creator Panel</h2>
      <p className="mb-2 text-xs font-light uppercase text-slate-400">
        Main menu
      </p>
      <div className="flex flex-col">
        <Link
          href={"/creator"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start",
          )}
          onClick={onLinkClick}
        >
          <InfoIcon size={16} className={cn("mr-2")} />
          Dashboard
        </Link>
        <Link
          href={"/creator/courses"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start",
          )}
          onClick={onLinkClick}
        >
          <ListIcon size={16} className={cn("mr-2")} />
          List of your courses
        </Link>
        <Link
          href={"/creator/courses/create"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full justify-start",
          )}
          onClick={onLinkClick}
        >
          <PlusIcon size={16} className={cn("mr-2")} />
          Create course
        </Link>
      </div>
    </div>
  );
}
