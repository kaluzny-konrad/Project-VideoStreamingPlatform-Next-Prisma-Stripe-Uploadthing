"use client";
import { trpc } from "@/server/client";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  userId: string;
};

export default function AdminUserDeleteButton({ userId }: Props) {
  const router = useRouter();

  const { mutate: deleteUser } = trpc.admin.deleteUser.useMutation({
    onSuccess: () => {
      toast("User deleted");
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteUser = (userId: string) => async () => {
    deleteUser({
      userId,
    });
  };

  return (
    <Button
      onClick={handleDeleteUser(userId)}
      variant={"destructive"}
      size={"icon"}
      className="h-6 w-6"
      data-test="admin-users-delete-button"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
