"use client";

import { trpc } from "@/server/client";

type Props = {
  subChapterId: string;
};

export default function CourseVideo({ subChapterId }: Props) {
  const {
    data: video,
    error,
    isLoading,
  } = trpc.video.getVideo.useQuery({
    subChapterId,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : video ? (
        <div>
          <video src={video.url} controls></video>
        </div>
      ) : null}
    </div>
  );
}
