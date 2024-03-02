"use client";

import { trpc } from "@/server/client";
import React from "react";

type Props = {
  videoId: string;
};

export default function CourseVideo({ videoId }: Props) {
  const {
    data: video,
    error,
    isLoading,
  } = trpc.video.getVideoToWatch.useQuery({
    videoId,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : video ? (
        <div>
          <h1>{video.videoName}</h1>
          <video src={video.url} controls></video>
        </div>
      ) : null}
    </div>
  );
}
