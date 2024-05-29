import CourseMarketplaceData from "@/components/CourseMarketplaceData";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function CoursePage({ params }: Props) {
  const { courseId } = params;
  const user = await currentUser();

  return (
    <div className="container p-4 mb-4 bg-white lg:mb-12 rounded-xl lg:min-h-96">
      <CourseMarketplaceData
        courseId={courseId}
        isLoggedIn={user ? true : false}
      />
    </div>
  );
}
