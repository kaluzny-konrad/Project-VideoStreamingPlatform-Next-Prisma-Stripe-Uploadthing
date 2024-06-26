import CreatorCourseChapters from "@/components/creator-chapters/CreatorCourseChapters";
import CreatorCourseInfo from "@/components/creator-course/CreatorCourseInfo";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

export default function CreatorCoursePage({ params }: Props) {
  const { courseId } = params;

  return (
    <div className="p-0 lg:p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Edit course</h2>

      <h2 className="mb-4 font-bold text-slate-600">Course info</h2>
      <Link
        href={`/creator/courses/${courseId}/edit`}
        className="flex text-xs text-slate-700 mb-2"
      >
        <EditIcon size={18} className="mr-2" />
        <p>Edit course info</p>
      </Link>
      <CreatorCourseInfo courseId={courseId} />

      <h2 className="mb-4 mt-8 font-bold text-slate-600">Course Chapters</h2>
      <CreatorCourseChapters courseId={courseId} />
    </div>
  );
}
