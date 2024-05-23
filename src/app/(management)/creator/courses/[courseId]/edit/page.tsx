import CreatorCourseEditForm from "@/components/CreatorCourseEditForm";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function CreatorCourseEditPage({ params }: Props) {
  const { courseId } = params;
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Edit course</h2>

      <CreatorCourseEditForm courseId={courseId} />
      <Link
        href={`/creator/courses/${courseId}`}
        className={buttonVariants({ variant: "ghost" })}
      >
        Back to course
      </Link>
    </div>
  );
}
