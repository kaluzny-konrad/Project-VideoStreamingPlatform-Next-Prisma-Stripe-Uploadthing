import CourseVideo from "@/components/CourseVideo";
import CourseVideos from "@/components/CourseVideos";

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
    </>
  );
}
