"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  courseId: string;
};

export default function AdminUserCourseDeleteButton({
  userId,
  courseId,
}: Props) {
  const router = useRouter();

  const { mutate: deleteUser } = trpc.admin.deleteUserCourse.useMutation({
    onSuccess: () => {
      console.log("User course deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteUser = (userId: string) => async () => {
    console.log("Deleting user", userId);

    deleteUser({
      userId,
      courseId,
    });
  };

  return (
    <Button
      onClick={handleDeleteUser(userId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
