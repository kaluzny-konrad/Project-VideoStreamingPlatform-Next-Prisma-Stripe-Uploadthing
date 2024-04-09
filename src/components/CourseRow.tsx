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
    <Link
      href={redirectToWatch ? `/watch/${course.id}` : `/courses/${course.id}`}
      className="group"
    >
      <div className="flex flex-col w-full py-6 border-b lg:flex-row">
        <div className="my-auto mb-4 lg:mr-4 lg:w-1/2 lg:mb-2">
          <Image
            src={course.imageUrl}
            alt={course.name}
            width={600}
            height={400}
            priority
            className={cn(
              "lg:h-42 rounded-lg object-cover",
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
          <div className="grid justify-between grid-cols-2 gap-4 px-6 py-4 bg-gray-100 rounded-lg lg:flex">
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
            <CourseStatsValue
              Icon={EyeIcon}
              text="Rating"
              value={course.stats.rating}
            />
            <CourseStatsValue
              Icon={MessageSquareIcon}
              text="Reviews"
              value={course.stats.reviews}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
