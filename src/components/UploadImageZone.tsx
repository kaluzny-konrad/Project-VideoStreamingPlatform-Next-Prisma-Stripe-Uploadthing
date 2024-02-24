"use client";

import { UploadButton } from "@/lib/uploadthing";

type Props = {
  imageUploaded: (args: { imageId: string }) => void;
};

export default function UploadImageZone({ imageUploaded }: Props) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (typeof res === "undefined") return;
        const fileId = res[0].serverData?.fileId;
        if (typeof fileId === "undefined") return;
        imageUploaded({ imageId: fileId });
      }}
      onUploadError={(error: Error) => {}}
    />
  );
}
