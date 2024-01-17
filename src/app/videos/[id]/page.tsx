import VideoPlayer from "@/components/VideoPlayer";
import { db } from "@/lib/db";
import { Video } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const { id } = params;

  const video = (await db.video.findFirst({
    where: {
      id: parseInt(id),
    },
  })) as unknown as Video;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <VideoPlayer props={{ title: video.name, url: video.url }} />
      </div>
    </div>
  );
}
