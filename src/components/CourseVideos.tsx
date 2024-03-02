"use client";

import { trpc } from "@/server/client";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

type Props = {
  courseId: string;
};

export default function CourseVideos({ courseId }: Props) {
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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : videos ? (
        <ul>
          {videos.map((video) => (
            <Link key={video.id} href={`/courses/${courseId}/watch/${video.id}`}>
              {video.name}
            </Link>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
