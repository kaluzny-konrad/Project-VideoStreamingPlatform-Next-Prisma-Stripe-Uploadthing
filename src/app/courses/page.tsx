import CoursesPanel from "@/components/CoursesPanel";
import CoursesPublicList from "@/components/CoursesPublicList";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-row p-2 ">
      <div className="w-64 mr-4">
        <CoursesPanel />
      </div>

      <div className="w-[50em]">
        <div className="p-4 bg-white rounded-xl min-h-96">
          <h1 className="text-lg font-bold text-slate-800">All courses</h1>
          <CoursesPublicList />
        </div>
      </div>
    </div>
  );
}
