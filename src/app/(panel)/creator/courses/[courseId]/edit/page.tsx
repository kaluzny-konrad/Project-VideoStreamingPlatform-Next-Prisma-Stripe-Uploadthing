import CreatorCourseEditForm from "@/components/CreatorCourseEditForm";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function page({ params }: Props) {
  const { courseId } = params;
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Edit course</h2>

      <CreatorCourseEditForm courseId={courseId} />
    </div>
  );
}
