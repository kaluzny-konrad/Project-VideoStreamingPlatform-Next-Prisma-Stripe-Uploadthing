"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";

type Props = {};

export default function PocCreateCourseButton({}: Props) {
  const route = useRouter();

  const { mutate: createCourse } = trpc.course.createCourse.useMutation({
    onSuccess: (res) => {
      route.refresh();
    },
  });

  const dummyCourseData = {
    name: "dummy course",
    description: "dummy course description",
    price: "10000",
    mainImageId: "asdbc",
  };

  return (
    <Button onClick={() => createCourse(dummyCourseData)}>
      CreateCourseButton
    </Button>
  );
}
