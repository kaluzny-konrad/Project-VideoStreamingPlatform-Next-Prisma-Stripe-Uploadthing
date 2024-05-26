"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { trpc } from "@/server/client";

type Props = {
  courseId: string;
  subChapterId: string;
};

export default function VideoUploadZone({ courseId, subChapterId }: Props) {
  const router = useRouter();
  const { mutate: addVideo } = trpc.video.connectVideoWithCourse.useMutation({
    onSuccess: (res) => {
      toast.success("Video added to course");
      router.refresh();
    },
  });

  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        if (typeof res === "undefined") return;
        const fileId = res[0].serverData?.fileId;
        if (typeof fileId === "undefined") return;
        addVideo({ courseId, videoId: fileId, subChapterId });
      }}
      onUploadError={(error: Error) => {}}
    />
  );
}
