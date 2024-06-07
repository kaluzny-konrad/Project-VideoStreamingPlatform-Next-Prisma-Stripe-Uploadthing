import { db } from "@/db";

import CreatorEditVideoModalTrigger from "@/components/creator-chapters/CreatorEditVideoModalTrigger";
import CreatorDeleteVideoButton from "@/components/creator-chapters/CreatorDeleteVideoButton";
import VideoUploadZone from "@/components/shared/VideoUploadZone";

type Props = {
  subChapterId: string;
};

export default async function SubChapterVideo({ subChapterId }: Props) {
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
              subChapterId={subChapterId}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-4 mt-8 font-bold text-slate-600">Upload video</h2>
          <VideoUploadZone subChapterId={subChapterId} />
        </>
      )}
    </div>
  );
}
