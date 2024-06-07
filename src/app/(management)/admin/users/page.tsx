import AdminUsersList from "@/components/admin/AdminUsersList";

type Props = {};

export default async function AdminUsersPage({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">List of users</h2>

      <AdminUsersList />
    </div>
  );
}
