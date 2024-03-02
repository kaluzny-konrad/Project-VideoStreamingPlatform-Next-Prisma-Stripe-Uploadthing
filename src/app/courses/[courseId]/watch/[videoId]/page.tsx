import CourseVideo from "@/components/CourseVideo";
import CourseVideos from "@/components/CourseVideos";

type Props = {
  params: {
    courseId: string;
    videoId: string;
  };
};

export default function page({ params }: Props) {
  const { courseId, videoId } = params;

  return (
    <div className="flex flex-row">
      <div className="min-w-64 mr-4">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Course Content
          </h2>
          <p className="mb-2 text-xs font-light uppercase text-slate-400">
            Videos
          </p>
          <div className="flex flex-col gap-2">
            <CourseVideos courseId={courseId} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h1 className="text-lg font-bold text-slate-800">Watch Course</h1>
          <CourseVideo videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
