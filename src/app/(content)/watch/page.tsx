import CoursesPanel from "@/components/CoursesPanel";
import CoursesPanelMobileButton from "@/components/CoursesPanelMobileButton";
import CoursesPrivateList from "@/components/CoursesPrivateList";

export default function WatchPage() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden mb-4 lg:min-w-64 lg:mr-4 lg:block">
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

      <div className="w-full">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h1 className="text-lg font-bold text-slate-800">All courses</h1>
          <CoursesPrivateList />
        </div>
      </div>
    </div>
  );
}
