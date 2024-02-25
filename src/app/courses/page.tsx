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
        <CoursesPublicList />
      </div>
    </div>
  );
}
