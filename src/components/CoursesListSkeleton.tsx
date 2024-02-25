import { Skeleton } from "./ui/skeleton";

type Props = {};

export default function CoursesListSkeleton({}: Props) {
  return (
    <>
      <Skeleton className="w-full h-24 mt-4 rounded-lg" />
      <Skeleton className="w-full h-24 mt-4 rounded-lg" />
      <Skeleton className="w-full h-24 mt-4 rounded-lg" />
    </>
  );
}
