"use client";

import { EditIcon } from "lucide-react";
import { Chapter } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { trpc } from "@/server/client";
import {
  UpdateChapterRequest,
  UpdateChapterValidator,
} from "@/lib/validators/chapter";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  chapter: Chapter;
  onChapterChanged: (chapter: Chapter) => void;
};

export default function EditChapterModal({ chapter, onChapterChanged }: Props) {
  const router = useRouter();

  const form = useForm<UpdateChapterRequest>({
    resolver: zodResolver(UpdateChapterValidator),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [key, value] of Object.entries(form.formState.errors)) {
        toast.error(`Something went wrong: ${value.message}`);
      }
    }
  }, [form.formState.errors]);

  const { mutate: editChapter } = trpc.chapter.updateChapter.useMutation({
    onSuccess: (res) => {
      toast.success(`Chapter changes saved.`);
      onChapterChanged(res);
      router.refresh();
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
    },
  });

  async function onSubmit(data: UpdateChapterRequest) {
    editChapter(data);
  }

  useEffect(() => {
    form.setValue("id", chapter.id);
    form.setValue("name", chapter.name);
  }, [chapter, form.setValue, form]);

  if (!chapter) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="h-6 w-6"
          data-test="edit-chapter-modal-trigger"
        >
          <EditIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id={`edit-chapter-${chapter.id}`}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant={"ghost"}
                  data-test="edit-chapter-modal-cancel-button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" data-test="edit-chapter-modal-save-button">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
