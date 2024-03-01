import CourseMarketplaceData from "@/components/CourseMarketplaceData";

type Props = {
  params: {
    courseId: string;
  };
};

export default function page({ params }: Props) {
  const { courseId } = params;

  return (
    <div className="container p-4 mb-12 bg-white rounded-xl min-h-96">
      <h2 className="mb-4 font-bold text-slate-800">Course info</h2>
      <CourseMarketplaceData courseId={courseId} />
    </div>
  );
}
