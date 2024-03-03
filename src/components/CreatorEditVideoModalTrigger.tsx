"use client";

import React from "react";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import CreatorEditVideoModal from "./CreatorEditVideoModal";
import { Video } from "@prisma/client";

type Props = {
  videoId: string;
  videoData: Video;
};

export default function CreatorEditVideoModalTrigger({ videoId, videoData }: Props) {
  const [openEditVideoId, setOpenEditVideoId] = React.useState<
    string | undefined
  >(undefined);

  return (
    <>
      <Button
        size={"icon"}
        className="h-6 w-6"
        onClick={() => setOpenEditVideoId(videoId)}
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
