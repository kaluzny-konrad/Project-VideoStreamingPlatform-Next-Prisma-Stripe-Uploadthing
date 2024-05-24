import CourseMarketplaceData from "@/components/CourseMarketplaceData";
import WrapperMaxWidth from "@/components/WrapperMaxWidth";
import { getAuthSession } from "@/lib/auth";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function CoursePage({ params }: Props) {
  const { courseId } = params;
  const session = await getAuthSession();

  return (
    <WrapperMaxWidth>
      <div className="container p-4 mb-4 bg-white lg:mb-12 rounded-xl lg:min-h-96">
        <CourseMarketplaceData
          courseId={courseId}
          isLoggedIn={session?.user ? true : false}
        />
      </div>
    </WrapperMaxWidth>
  );
}
