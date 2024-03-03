import CourseVideos from "@/components/CourseVideos";
import CourseVideo from "@/components/CourseVideo";
import React from "react";
import CourseWatchDescription from "@/components/CourseWatchDescription";
import CourseDescriptionButton from "@/components/CourseDescriptionButton";

type Props = {
  params: {
    courseId: string;
  };
};

export default function page({ params }: Props) {
  const { courseId } = params;

  return (
    <>
      <h1 className="text-lg font-bold text-slate-800">Watch Course</h1>
      <CourseWatchDescription courseId={courseId} />
    </>
  );
}
