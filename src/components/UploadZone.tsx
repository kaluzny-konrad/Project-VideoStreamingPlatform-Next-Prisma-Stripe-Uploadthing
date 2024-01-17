"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

type Props = {};

export default function UploadZone({}: Props) {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        if (typeof res === "undefined") return;
        const fileId = res[0].serverData?.fileId;
        if (typeof fileId === "undefined") return;
        router.push(`/videos/${fileId}`);
      }}
      onUploadError={(error: Error) => {}}
    />
  );
}
