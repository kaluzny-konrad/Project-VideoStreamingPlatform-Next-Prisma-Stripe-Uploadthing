"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Video } from "@prisma/client";

import { UploadButton } from "@/lib/uploadthing";

type Props = {
  onClientUploadCompleted: (video: Video) => void;
  onBeforeUploadBegined: () => void;
};

export default function VideoUploadZone({
  onClientUploadCompleted,
  onBeforeUploadBegined,
}: Props) {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="videoUploader"
      onBeforeUploadBegin={(files: File[]) => {
        onBeforeUploadBegined();
        return files;
      }}
      onClientUploadComplete={(res) => {
        if (typeof res === "undefined") return;
        const video = res[0].serverData?.uploadedFile as Video;
        if (typeof video === "undefined") return;
        onClientUploadCompleted(video);
      }}
      onUploadError={(error: Error) => {
        if (typeof error.message === "string") {
          if (error.message === "Invalid config: FileSizeMismatch") {
            toast.error("File size too large. Please upload a smaller file.");
            return;
          }
        }
        toast.error(`Something went wrong.`);
      }}
    />
  );
}
