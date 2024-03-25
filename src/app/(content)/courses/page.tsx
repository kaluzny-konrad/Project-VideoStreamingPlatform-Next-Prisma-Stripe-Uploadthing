import CoursesPanel from "@/components/CoursesPanel";
import CoursesPublicList from "@/components/CoursesPublicList";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-row">
      <div className="min-w-64 mr-4">
        <div className="p-4 bg-white rounded-xl min-h-96">
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

      <div className="w-full">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h1 className="text-lg font-bold text-slate-800">All courses</h1>
          <CoursesPublicList />
        </div>
      </div>
    </div>
  );
}
