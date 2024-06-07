import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  courseId: string;
};

export default function CourseWatchButton({ courseId }: Props) {
  return (
    <Link href={`/watch/${courseId}`} className={cn(buttonVariants())}>
      Watch course
    </Link>
  );
}
