import AdminCategoriesList from "@/components/AdminCategoriesList";

type Props = {};

export default async function AdminCategoriesPage({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">List of categories</h2>

      <AdminCategoriesList />
    </div>
  );
}
