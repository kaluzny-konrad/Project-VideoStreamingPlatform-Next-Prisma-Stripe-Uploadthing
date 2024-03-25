import { CourseOnList } from "@/types/course";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  CalendarIcon,
  EyeIcon,
  MessageSquareIcon,
  WalletIcon,
} from "lucide-react";
import CourseStatsValue from "./CourseStatsValue";
import { cn } from "@/lib/utils";

type Props = {
  course: CourseOnList;
  redirectToWatch: boolean;
};

export default function CourseRow({ course, redirectToWatch }: Props) {
  return (
    <Link href={redirectToWatch ? `/watch/${course.id}` : `/courses/${course.id}`} className="group">
      <div className="flex border-b py-6 w-full">
        <div className="my-auto mr-4 w-1/2">
          <Image
            src={course.imageUrl}
            alt={course.name}
            width={600}
            height={400}
            priority
            className={cn(
              "h-42 rounded-lg object-cover",
              "group-hover:opacity-80 transition-opacity duration-300"
            )}
          />
        </div>

        <div className="space-y-4">
          <p
            className={cn(
              "text-lg font-bold text-slate-700 mb-2",
              "group-hover:text-slate-900 duration-300"
            )}
          >
            {course.name}
          </p>
          <p className="text-sm text-slate-500">{course.description}</p>
          <div className="bg-gray-100 py-4 px-6 rounded-lg flex justify-between">
            <CourseStatsValue
              Icon={WalletIcon}
              text="Price"
              value={`${course.price}`}
            />

            <CourseStatsValue
              Icon={CalendarIcon}
              text="Publication"
              value={course.publicatedAt}
            />
            <CourseStatsValue Icon={EyeIcon} text="Views" value={10} />
            <CourseStatsValue
              Icon={MessageSquareIcon}
              text="Comments"
              value={10}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
