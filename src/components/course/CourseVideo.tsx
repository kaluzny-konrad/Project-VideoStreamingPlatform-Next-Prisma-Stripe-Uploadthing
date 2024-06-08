"use client";

import { trpc } from "@/server/client";
import { Video } from "@prisma/client";

type Props = {
  video: Video;
};

export default function CourseVideo({ video }: Props) {
  return (
    <div>
      <video src={video.url} controls></video>
    </div>
  );
}
