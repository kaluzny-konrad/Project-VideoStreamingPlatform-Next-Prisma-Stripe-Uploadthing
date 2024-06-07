import CoursesPanel from "@/components/courses/CoursesPanel";
import CoursesPanelMobileButton from "@/components/courses/CoursesPanelMobileButton";
import CoursesPrivateList from "@/components/courses/CoursesPrivateList";

export default function WatchPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden w-1/4 lg:block mr-4">
        <div className="p-4 bg-white rounded-xl lg:min-h-96">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Filter Courses
          </h2>
          <p className="mb-2 text-xs font-light uppercase text-slate-400">
            Category
          </p>
          <div className="flex flex-col gap-2">
            <CoursesPanel />
          </div>
        </div>
      </div>

      <div className="block mb-4 lg:hidden">
        <CoursesPanelMobileButton />
      </div>

      <div className="w-full lg:w-3/4 p-4 bg-white rounded-xl">
        <h1 className="text-lg font-bold text-slate-800">
          Watch owned courses
        </h1>
        <CoursesPrivateList />
      </div>
    </div>
  );
}
