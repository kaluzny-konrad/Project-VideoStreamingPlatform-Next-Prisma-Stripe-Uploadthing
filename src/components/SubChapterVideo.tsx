import { db } from "@/db";
import CreatorEditVideoModalTrigger from "./CreatorEditVideoModalTrigger";
import CreatorDeleteVideoButton from "./CreatorDeleteVideoButton";
import VideoUploadZone from "./VideoUploadZone";

type Props = {
  subChapterId: string;
  courseId: string;
};

export default async function SubChapterVideo({
  subChapterId,
  courseId,
}: Props) {
  const subChapter = await db.subChapter.findUnique({
    where: {
      id: subChapterId,
    },
    include: {
      Video: true,
    },
  });

  return (
    <div>
      {subChapter?.Video ? (
        <>
          <h2 className="mb-4 mt-8 font-bold text-slate-600">Uploaded video</h2>
          <div key={subChapter?.Video.id} className="flex">
            <p>{subChapter?.Video.videoName}</p>
            <CreatorEditVideoModalTrigger
              videoId={subChapter?.Video.id}
              videoData={subChapter?.Video}
            />
            <CreatorDeleteVideoButton
              videoId={subChapter?.Video.id}
              courseId={courseId}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-4 mt-8 font-bold text-slate-600">Upload video</h2>
          <VideoUploadZone courseId={courseId} subChapterId={subChapterId} />
        </>
      )}
    </div>
  );
}
