import CreatorCourseInfo from "@/components/CreatorCourseInfo";
import CreatorCourseVideos from "@/components/CreatorCourseVideos";
import UploadVideoZone from "@/components/UploadVideoZone";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

export default function page({ params }: Props) {
  const { courseId } = params;

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Edit course</h2>

      <h2 className="mb-4 font-bold text-slate-600">Course info</h2>
      <CreatorCourseInfo courseId={courseId} />

      <h2 className="mb-4 mt-8 font-bold text-slate-600">List of videos</h2>
      <CreatorCourseVideos courseId={courseId} />

      <h2 className="mb-4 mt-8 font-bold text-slate-600">Upload video</h2>
      <UploadVideoZone courseId={courseId} />
    </div>
  );
}
