import CreatorCoursesList from "@/components/creator/CreatorCoursesList";

export default async function CreatorCoursesPage() {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">List of courses</h2>

      <CreatorCoursesList />
    </div>
  );
}
