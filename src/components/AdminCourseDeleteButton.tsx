"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  courseId: string;
};

export default function AdminCourseDeleteButton({ courseId }: Props) {
  const router = useRouter();

  const { mutate: deleteCourse } = trpc.admin.deleteCourse.useMutation({
    onSuccess: () => {
      console.log("Course deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteCourse = (courseId: string) => async () => {
    console.log("Deleting course", courseId);

    deleteCourse({
      courseId,
    });
  };

  return (
    <Button
      onClick={handleDeleteCourse(courseId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
