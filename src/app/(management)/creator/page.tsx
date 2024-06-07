import CoursesCreatorStats from "@/components/courses/CoursesCreatorStats";

export default async function CreatorPage() {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">
        Creator Dashboard
      </h2>

      <CoursesCreatorStats />
    </div>
  );
}
