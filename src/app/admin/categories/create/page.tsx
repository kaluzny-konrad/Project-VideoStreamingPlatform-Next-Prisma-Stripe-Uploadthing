import AdminCategoryCreateForm from "@/components/AdminCategoryCreateForm";

type Props = {};

export default async function page({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Add category</h2>

      <AdminCategoryCreateForm />
    </div>
  );
}
