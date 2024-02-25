import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon, ListIcon, PlusIcon, VideoIcon } from "lucide-react";

type Props = {};

export default function AdminPanel({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-2 text-lg font-bold text-slate-800">Creator Panel</h2>

      <div className="flex flex-col">
        <p className="my-2 text-xs font-light uppercase text-slate-400">
          Main menu
        </p>
        <Link
          href={"/admin"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <InfoIcon size={16} className={cn("mr-2")} />
          Dashboard
        </Link>

        <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
          Videos
        </p>

        <Link
          href={"/admin/videos"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <VideoIcon size={16} className={cn("mr-2")} />
          List of videos
        </Link>

        <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
          Courses
        </p>

        <Link
          href={"/admin/courses"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <ListIcon size={16} className={cn("mr-2")} />
          List of courses
        </Link>

        <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
          Categories
        </p>

        <Link
          href={"/admin/categories"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <ListIcon size={16} className={cn("mr-2")} />
          List of categories
        </Link>

        <Link
          href={"/admin/categories/create"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <PlusIcon size={16} className={cn("mr-2")} />
          Create category
        </Link>
      </div>
    </div>
  );
}
