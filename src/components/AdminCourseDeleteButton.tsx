"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  courseId: string;
};

export default function AdminCourseDeleteButton({ courseId }: Props) {
  const router = useRouter();

  const { mutate: deleteCourse } = trpc.admin.deleteCourse.useMutation({
    onSuccess: () => {
      toast("Course deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteCourse = (courseId: string) => async () => {
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
      data-test="admin-courses-delete-button"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
