import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon, ListIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

export default function AdminPanel({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Admin Panel</h2>
      <p className="mb-2 text-xs font-light uppercase text-slate-400">
        Main menu
      </p>
      <div className="flex flex-col">
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
        <Link
          href={"/admin/courses/add"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start w-full"
          )}
        >
          <PlusIcon size={16} className={cn("mr-2")} />
          Add course
        </Link>
      </div>
    </div>
  );
}
