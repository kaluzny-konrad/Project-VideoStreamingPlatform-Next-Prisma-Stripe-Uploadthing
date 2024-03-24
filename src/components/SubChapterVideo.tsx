import { db } from "@/db";
import CreatorEditVideoModalTrigger from "./CreatorEditVideoModalTrigger";
import CreatorDeleteVideoButton from "./CreatorDeleteVideoButton";

type Props = {
  subChapterId: string;
  courseId: string;
};

export default async function SubChapterVideo({subChapterId, courseId}: Props) {
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
      {subChapter?.Video && (
        <div key={subChapter?.Video.id} className="flex">
          <p>{subChapter?.Video.videoName}</p>
          <CreatorEditVideoModalTrigger videoId={subChapter?.Video.id} videoData={subChapter?.Video} />
          <CreatorDeleteVideoButton videoId={subChapter?.Video.id} courseId={courseId}/>
        </div>
      )}
    </div>
  );
}
