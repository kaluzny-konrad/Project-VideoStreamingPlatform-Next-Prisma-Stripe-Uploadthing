"use client";

import { db } from "@/db";
import { UploadButton } from "@/lib/uploadthing";
import { trpc } from "@/server/client";

type Props = {
  courseId: string;
};

export default function UploadZone({ courseId }: Props) {
  const { mutate: addVideo } = trpc.product.addVideoToCourse.useMutation({
    onSuccess: (res) => {
      console.log("res", res);
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
