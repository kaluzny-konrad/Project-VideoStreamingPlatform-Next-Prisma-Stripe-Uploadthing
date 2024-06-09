"use client";

import { EditIcon } from "lucide-react";
import { Chapter } from "@prisma/client";
import { useEffect, useRef } from "react";
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
  onChange: (chapter: Chapter) => void;
  disabled: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function EditChapterModal({
  chapter,
  onChange,
  disabled,
  setOptimisticUpdateLoading,
}: Props) {
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
      toast.success(`Changes saved`);
      onChange(res);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
      onChange(chapter);
    },
    onSettled: () => {
      setOptimisticUpdateLoading(false);
    },
  });

  function isChapterChanged(formData: UpdateChapterRequest) {
    return formData.name !== chapter.name;
  }

  async function onSubmit(data: UpdateChapterRequest) {
    closeDialogButtonRef.current?.click();

    // Check if the chapter has changed
    if (!isChapterChanged(data)) {
      toast.info("No changes detected");
      return;
    }

    // Optimistic update
    setOptimisticUpdateLoading(true);
    const optimisticReview: Chapter = {
      ...chapter,
      name: data.name,
    };
    onChange(optimisticReview);

    // Real update
    editChapter(data);
  }

  useEffect(() => {
    form.setValue("id", chapter.id);
    form.setValue("name", chapter.name);
  }, [chapter, form.setValue, form]);

  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);

  if (!chapter) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="button-default-size"
          data-test="edit-chapter-modal-trigger"
          disabled={disabled}
        >
          <EditIcon className="button-default-icon-size" />
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
              <DialogClose asChild ref={closeDialogButtonRef}>
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
