import CourseMarketplaceData from "@/components/CourseMarketplaceData";
import TextHeader from "@/components/base/TextHeader";
import { getAuthSession } from "@/lib/auth";

type Props = {
  params: {
    courseId: string;
  };
};

export default async function page({ params }: Props) {
  const { courseId } = params;
  const session = await getAuthSession();

  return (
    <div className="container p-4 mb-4 bg-white lg:mb-12 rounded-xl lg:min-h-96">
      <CourseMarketplaceData
        courseId={courseId}
        isLoggedIn={session?.user ? true : false}
      />
    </div>
  );
}
