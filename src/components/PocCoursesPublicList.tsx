"use client";

import { trpc } from "@/server/client";

type Props = {};

export default function PocCoursesPublicList({}: Props) {
  const {
    data: courses,
    isLoading: loading,
    error,
  } = trpc.course.getCourses.useQuery();

  return <div>
    <h1>All courses</h1>
    {loading ? "Loading..." : courses?.map((course) => (
      <div key={course.id}>
        <h2>{course.name}</h2>
        <p>{course.description}</p>
        <p>{course.price / 100}$</p>
      </div>
    ))}
    {error && <p>Error: {error.message}</p>}
  </div>;
}
