import CourseChapters from "@/components/CourseChapters";
import CourseWatchDescription from "@/components/CourseWatchDescription";
import ReviewUser from "@/components/ReviewUser";
import ReviewsOtherUsers from "@/components/ReviewsOtherUsers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  children: React.ReactNode;
  params: {
    courseId: string;
  };
};

export default async function CourseLayout({ children, params }: Props) {
  const { courseId } = params;

  return (
    <div className="flex flex-row">
      <div className="min-w-64 mr-4">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Course Content
          </h2>
          <p className="mb-2 text-xs font-light uppercase text-slate-400">
            Chapters
          </p>
          <div className="flex flex-col gap-2">
            <CourseChapters courseId={courseId} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="p-4 bg-white rounded-xl min-h-96 mb-3">{children}</div>
        <div className="p-4 bg-white rounded-xl min-h-20 mb-3">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <CourseWatchDescription courseId={courseId} />
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewUser courseId={courseId} />
              <ReviewsOtherUsers courseId={courseId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
