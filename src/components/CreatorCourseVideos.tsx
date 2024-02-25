import { db } from "@/db";
import React from "react";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import CreatorDeleteVideoButton from "./CreatorDeleteVideoButton";

type Props = {
  courseId: string;
};

export default async function CreatorCourseVideos({ courseId }: Props) {
  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      VideosIncluded: true,
    },
  });

  return (
    <div>
      {course?.VideosIncluded.map((video, index) => (
        <div key={video.id} className="flex">
          <p>{index + 1}.</p>
          <p>{video.videoName}</p>
          <Button size={"icon"} className="h-6 w-6">
            <EditIcon className="w-4 h-4" />
          </Button>
          <CreatorDeleteVideoButton courseId={courseId} videoId={video.id} />
        </div>
      ))}
    </div>
  );
}
