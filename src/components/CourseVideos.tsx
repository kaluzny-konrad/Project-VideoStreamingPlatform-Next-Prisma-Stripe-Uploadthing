"use client";

import { trpc } from "@/server/client";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  courseId: string;
};

export default function CourseVideos({ courseId }: Props) {
  const pathname = usePathname();

  const {
    data: videos,
    error,
    isLoading,
  } = trpc.video.getVideosIncludedInCourse.useQuery({
    courseId,
  });

  if (error) {
    toast.error("Error loading videos");
    console.error(error);
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <p>Loading...</p>
      ) : videos ? (
        <>
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/watch/${courseId}/${video.id}`}
              className={cn(
                buttonVariants({
                  variant: pathname.includes(video.id) ? "default" : "ghost",
                }),
                "justify-start w-full"
              )}
            >
              <p className="py-2">{video.name}</p>
            </Link>
          ))}
        </>
      ) : null}
    </div>
  );
}
