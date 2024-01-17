"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

type Props = {};

export default function UploadZone({}: Props) {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const [fileId] = res;

        router.push(`/images/${fileId}`);
      }}
      onUploadError={(error: Error) => {}}
    />
  );
}
