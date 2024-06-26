import Link from "next/link";
import { InfoIcon, ListIcon, PlusIcon, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  onLinkClick?: () => void;
};

export default function AdminPanel({ onLinkClick }: Props) {
  return (
    <div className="min-h-96 rounded-xl bg-white p-4">
      <h2 className="mb-2 text-lg font-bold text-slate-800">Admin Panel</h2>

      <div className="flex flex-col">
        <div>
          <p className="my-2 text-xs font-light uppercase text-slate-400">
            Main menu
          </p>
          <Link
            href={"/admin"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <InfoIcon size={16} className={cn("mr-2")} />
            Dashboard
          </Link>
        </div>

        <div>
          <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
            Videos
          </p>

          <Link
            href={"/admin/videos"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <VideoIcon size={16} className={cn("mr-2")} />
            List of videos
          </Link>
        </div>

        <div>
          <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
            Courses
          </p>

          <Link
            href={"/admin/courses"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <ListIcon size={16} className={cn("mr-2")} />
            List of courses
          </Link>
        </div>

        <div>
          <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
            Categories
          </p>

          <Link
            href={"/admin/categories"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <ListIcon size={16} className={cn("mr-2")} />
            List of categories
          </Link>

          <Link
            href={"/admin/categories/create"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <PlusIcon size={16} className={cn("mr-2")} />
            Create category
          </Link>
        </div>

        <div>
          <p className="mb-1 mt-3 text-xs font-light uppercase text-slate-400">
            Users
          </p>

          <Link
            href={"/admin/users"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <ListIcon size={16} className={cn("mr-2")} />
            List of users
          </Link>

          <Link
            href={"/admin/users/courses"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start",
            )}
            onClick={onLinkClick}
          >
            <VideoIcon size={16} className={cn("mr-2")} />
            Owned courses
          </Link>
        </div>
      </div>
    </div>
  );
}
