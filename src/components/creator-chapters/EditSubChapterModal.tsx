"use client";

import { EditIcon } from "lucide-react";
import { SubChapter } from "@prisma/client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { trpc } from "@/server/client";
import {
  UpdateSubChapterRequest,
  UpdateSubChapterValidator,
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
  subChapter: SubChapter;
  onChange: (subChapter: SubChapter) => void;
  disabled: boolean;
  setOptimisticUpdateLoading: (loading: boolean) => void;
};

export default function EditChapterModal({
  subChapter,
  onChange,
  disabled,
  setOptimisticUpdateLoading,
}: Props) {
  const form = useForm<UpdateSubChapterRequest>({
    resolver: zodResolver(UpdateSubChapterValidator),
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

  const { mutate: editSubChapter } = trpc.chapter.updateSubChapter.useMutation({
    onSuccess: (res) => {
      toast.success(`Changes saved`);
      onChange(res);
    },
    onError: (err) => {
      toast.error(`Something went wrong.`);
      console.error(err);
      onChange(subChapter);
    },
    onSettled: () => {
      setOptimisticUpdateLoading(false);
    },
  });

  function isSubChapterChanged(formData: UpdateSubChapterRequest) {
    return formData.name !== subChapter.name;
  }

  async function onSubmit(data: UpdateSubChapterRequest) {
    closeDialogButtonRef.current?.click();

    // Check if the subChapter has changed
    if (!isSubChapterChanged(data)) {
      toast.info("No changes detected");
      return;
    }

    // Optimistic update
    setOptimisticUpdateLoading(true);
    const optimisticReview: SubChapter = {
      ...subChapter,
      name: data.name,
    };
    onChange(optimisticReview);

    // Real update
    editSubChapter(data);
  }

  useEffect(() => {
    form.setValue("id", subChapter.id);
    form.setValue("name", subChapter.name);
  }, [subChapter, form.setValue, form]);

  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);

  if (!subChapter) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="button-default-size"
          data-test="edit-subChapter-modal-trigger"
          disabled={disabled}
        >
          <EditIcon className="button-default-icon-size" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            id={`edit-subChapter-${subChapter.id}`}
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
                  data-test="edit-subChapter-modal-cancel-button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                data-test="edit-subChapter-modal-save-button"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
