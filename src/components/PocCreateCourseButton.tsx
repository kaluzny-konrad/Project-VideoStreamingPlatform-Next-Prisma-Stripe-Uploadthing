"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { CourseCreateRequest } from "@/lib/validators/course";

type Props = {};

export default function PocCreateCourseButton({}: Props) {
  const route = useRouter();

  const { mutate: createCourse } = trpc.course.createCourse.useMutation({
    onSuccess: (res) => {
      route.refresh();
    },
  });

  const dummyCourseData: CourseCreateRequest = {
    name: "dummy course",
    description: "dummy course description",
    price: "100.00",
    imageId: "asdbc",
    categoryId: "asdbc",
  };

  return (
    <Button onClick={() => createCourse(dummyCourseData)}>
      CreateCourseButton
    </Button>
  );
}
