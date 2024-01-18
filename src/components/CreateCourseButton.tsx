"use client";

import { Button } from "./ui/button";
import { trpc } from "@/server/client";

type Props = {};

export default function CreateCourseButton({}: Props) {
  const { mutate: createCourse } = trpc.product.createCourse.useMutation({
    onSuccess: (res) => {
      console.log("res", res);
    },
  });

  const dummyCourseData = {
    name: "dummy course",
    description: "dummy course description",
    price: 100,
    image: "dummy course image",
  };

  return (
    <Button onClick={() => createCourse(dummyCourseData)}>
      CreateCourseButton
    </Button>
  );
}
