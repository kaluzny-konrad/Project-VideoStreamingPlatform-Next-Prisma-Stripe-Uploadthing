"use client";

import { trpc } from "@/server/client";

type Props = {};

export default function AllCoursesList({}: Props) {
  const {
    data: courses,
    isLoading: loading,
    error,
  } = trpc.courses.getCourses.useQuery();

  return <div>
    <h1>All courses</h1>
    {loading ? "Loading..." : courses?.map((course) => (
      <div key={course.id}>
        <h2>{course.Product.name}</h2>
        <p>{course.Product.description}</p>
        <p>{course.Product.price / 100}$</p>
      </div>
    ))}
    {error && <p>Error: {error.message}</p>}
  </div>;
}
