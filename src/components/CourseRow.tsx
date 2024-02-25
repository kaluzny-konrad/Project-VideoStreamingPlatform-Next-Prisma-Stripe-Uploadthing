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

type Props = {
  course: CourseOnList;
};

export default function CourseRow({ course }: Props) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="flex border-b py-6">
        <div className="my-auto m-4">
          <Image
            src={course.imageUrl}
            alt={course.name}
            width={600}
            height={400}
            className=" rounded-lg"
          />
        </div>

        <div>
          <div className="flex">
            <div className="p-4">
              <p className="text-lg font-bold text-slate-700 mt-4 mb-2">
                {course.name}
              </p>
              <p className="text-sm mb-2 text-slate-500">
                {course.description}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex gap-2 my-auto">
              <div className="w-24 space-y-3">
                <CourseStatsValue
                  Icon={WalletIcon}
                  text="Price"
                  value={`${course.price} PLN`}
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
        </div>
      </div>
    </Link>
  );
}
