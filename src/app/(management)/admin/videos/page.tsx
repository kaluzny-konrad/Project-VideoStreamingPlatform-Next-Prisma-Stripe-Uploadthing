import AdminVideosList from "@/components/AdminVideosList";

export default async function AdminVideosPage() {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">List of videos</h2>

      <AdminVideosList />
    </div>
  );
}
