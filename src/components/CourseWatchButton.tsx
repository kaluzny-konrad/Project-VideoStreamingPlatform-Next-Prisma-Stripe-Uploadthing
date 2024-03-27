import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

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
