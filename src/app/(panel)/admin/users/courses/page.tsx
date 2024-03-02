import AdminUsersCoursesList from "@/components/AdminUsersCoursesList";

type Props = {};

export default async function page({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Owned Users Courses</h2>

      <AdminUsersCoursesList />
    </div>
  );
}
