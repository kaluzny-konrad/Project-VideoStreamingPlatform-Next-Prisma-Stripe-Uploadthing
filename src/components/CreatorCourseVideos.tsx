import { db } from "@/db";
import CreatorDeleteVideoButton from "./CreatorDeleteVideoButton";
import CreatorEditVideoModalTrigger from "./CreatorEditVideoModalTrigger";

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
          <CreatorEditVideoModalTrigger videoId={video.id} videoData={video} />
          <CreatorDeleteVideoButton courseId={courseId} videoId={video.id} />
        </div>
      ))}
    </div>
  );
}
