"use client";

import { UploadButton } from "@/lib/uploadthing";
import { trpc } from "@/server/client";
import { toast } from "sonner";

type Props = {
  courseId: string;
};

export default function UploadZone({ courseId }: Props) {
  const { mutate: addVideo } = trpc.product.addVideoToCourse.useMutation({
    onSuccess: (res) => {
      toast.success("Video added to course");
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
