"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";

type Props = {};

export default function CreateCourseButton({}: Props) {
  const route = useRouter();

  const { mutate: createCourse } = trpc.product.createCourse.useMutation({
    onSuccess: (res) => {
      route.refresh();
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
