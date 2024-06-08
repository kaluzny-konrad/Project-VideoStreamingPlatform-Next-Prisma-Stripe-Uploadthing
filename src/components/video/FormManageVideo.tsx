"use client";

import { Video } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { trpc } from "@/server/client";

import EditVideoModal from "@/components/video/EditVideoModal";
import CreatorDeleteVideoButton from "@/components/video/DeleteVideoButton";
import VideoUploadZone from "@/components/video/VideoUploadZone";

type Props = {
  subChapterId: string;
};

export default function FormManageVideo({ subChapterId }: Props) {
  const router = useRouter();
  const [video, setVideo] = useState<Video | undefined>(undefined);

  const {
    data: subChapter,
    isLoading,
    error,
  } = trpc.chapter.getSubChapter.useQuery(subChapterId);

  const { mutate: connectVideoWithCourse } =
    trpc.video.addVideoToCourse.useMutation({
      onSuccess: (res) => {
        toast.success("Video added to course");
      },
      onError: (error) => {
        toast.error("Something went wrong");
        setVideo(undefined);
      },
    });

  function onBeforeUploadBegined() {}

  function onClientUploadCompleted(video: Video) {
    setVideo(video);
    connectVideoWithCourse({ subChapterId, videoId: video.id });
  }

  function handleVideoDeleted() {
    toast.success("Video deleted");
    setVideo(undefined);
  }

  useEffect(() => {
    if (subChapter?.Videos[0]) {
      setVideo(subChapter.Videos[0]);
    }
  }, [subChapter]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {video ? (
        <>
          <h2 className="mb-4 mt-8 font-bold text-slate-600">Uploaded video</h2>
          <div key={video.id} className="flex">
            <p>{video.videoName}</p>
            <EditVideoModal video={video} />
            <CreatorDeleteVideoButton
              videoId={video.id}
              onVideoDeleted={handleVideoDeleted}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-4 mt-8 font-bold text-slate-600">Upload video</h2>
          <VideoUploadZone
            onClientUploadCompleted={onClientUploadCompleted}
            onBeforeUploadBegined={onBeforeUploadBegined}
          />
        </>
      )}
    </div>
  );
}
