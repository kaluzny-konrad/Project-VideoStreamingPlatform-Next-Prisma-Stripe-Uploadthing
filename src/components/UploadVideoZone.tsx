"use client";

import { UploadButton } from "@/lib/uploadthing";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  courseId: string;
};

export default function UploadVideoZone({ courseId }: Props) {
  const router = useRouter();
  const { mutate: addVideo } = trpc.video.addVideoToCourse.useMutation({
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
        addVideo({ courseId, videoId: fileId });
      }}
      onUploadError={(error: Error) => {}}
    />
  );
}
