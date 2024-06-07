import Image from "next/image";
import Link from "next/link";
import { Course } from "@prisma/client";

import { cn } from "@/lib/utils";
import CourseStatsRow from "@/components/course/CourseStatsRow";

type Props = {
  course: Course;
  photoUrl: string;
  reviewsCount: number;
  redirectToWatch: boolean;
};

export default function CourseRow({ course, photoUrl, redirectToWatch, reviewsCount }: Props) {
  return (
    <Link
      href={redirectToWatch ? `/watch/${course.id}` : `/courses/${course.id}`}
      className="group"
    >
      <div className="flex flex-col py-6 border-b lg:flex-row">
        <div className="my-auto mb-4 lg:mr-4 lg:w-1/2 lg:mb-2">
          <Image
            src={photoUrl}
            alt={course.name}
            width={600}
            height={400}
            priority
            className={cn(
              "lg:h-42 rounded-lg object-cover",
              "group-hover:opacity-80 transition-opacity duration-300",
              "aspect-video"
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

          <CourseStatsRow
            price={course.price}
            publicatedAt={course.createdAt}
            rating={course.rating}
            reviewsCount={reviewsCount}
          />
        </div>
      </div>
    </Link>
  );
}
