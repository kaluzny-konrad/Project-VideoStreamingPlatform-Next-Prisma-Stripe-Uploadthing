import { cn } from "@/lib/utils";
import { Chapter, SubChapter } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

type Props = {
  courseId: string;
  chapter: Chapter;
  subChapters: SubChapter[];
  chaptersStateId: string;
  closeModal?: () => void;
};

export default function CourseChaptersList({
  courseId,
  chapter,
  subChapters,
  chaptersStateId,
  closeModal
}: Props) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800">{chapter.name}</h3>
      <div className="flex flex-col gap-4">
        {subChapters.map((subChapter) => (
          <div key={subChapter.id} className="flex items-center gap-2">
            <Link
              href={`/watch/${courseId}/${subChapter.id}`}
              className={cn(buttonVariants({
                variant: pathname.includes(subChapter.id) ? "default" : "ghost",
                size: "sm",
                className: "w-full",
              }))}
              onClick={closeModal}
            >
              <p>{subChapter.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
