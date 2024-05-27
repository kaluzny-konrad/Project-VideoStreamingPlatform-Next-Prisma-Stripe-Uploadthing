import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { DeleteChapterRequest } from "@/lib/validators/chapter";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

type Props = {
  chapterId: string;
  deleteChapterFromChaptersState: (chapterId: string) => void;
  disabled: boolean;
};

export default function DeleteChapterButton({
  chapterId,
  deleteChapterFromChaptersState,
  disabled,
}: Props) {
  const { mutate: deleteChapter } = trpc.chapter.deleteChapter.useMutation({
    onSuccess: () => {
      toast.success("Chapter deleted");
      deleteChapterFromChaptersState(chapterId);
    },
  });

  async function handleDeleteChapter() {
    const data: DeleteChapterRequest = {
      id: chapterId,
    };
    deleteChapter(data);
  }

  return (
    <Button
      onClick={handleDeleteChapter}
      variant={disabled ? "ghost" : "destructive"}
      className="mt-2"
      disabled={disabled}
      size={"icon"}
      data-test="delete-chapter-button"
    >
      <Trash2Icon size={16} />
    </Button>
  );
}
