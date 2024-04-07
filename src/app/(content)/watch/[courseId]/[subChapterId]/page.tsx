import CourseVideo from "@/components/CourseVideo";
import CourseVideos from "@/components/CourseVideos";
import CourseWatchDescription from "@/components/CourseWatchDescription";

type Props = {
  params: {
    courseId: string;
    subChapterId: string;
  };
};

export default function page({ params }: Props) {
  const { courseId, subChapterId } = params;

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Watch Course</h1>
      <CourseVideo subChapterId={subChapterId} />
      <CourseWatchDescription courseId={courseId} />
    </>
  );
}
