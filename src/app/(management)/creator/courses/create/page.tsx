import CreatorCourseCreateForm from "@/components/CreatorCourseCreateForm";

export default async function CreatorCourseCreatePage() {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Add course</h2>

      <CreatorCourseCreateForm />
    </div>
  );
}
