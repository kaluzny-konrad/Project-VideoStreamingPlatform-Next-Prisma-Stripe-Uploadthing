"use client";

import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import CreatorEditVideoModal from "./CreatorEditVideoModal";
import { Video } from "@prisma/client";
import { useState } from "react";

type Props = {
  videoId: string;
  videoData: Video;
};

export default function CreatorEditVideoModalTrigger({ videoId, videoData }: Props) {
  const [openEditVideoId, setOpenEditVideoId] = useState<
    string | undefined
  >(undefined);

  return (
    <>
      <Button
        size={"icon"}
        className="h-6 w-6"
        onClick={() => setOpenEditVideoId(videoId)}
        data-test="creator-videos-edit-button"
      >
        <EditIcon className="w-4 h-4" />
      </Button>

      {openEditVideoId === videoId && (
        <CreatorEditVideoModal
          videoData={videoData}
          setOpenEditVideoId={setOpenEditVideoId}
        />
      )}
    </>
  );
}
