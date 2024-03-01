import AdminPanel from "@/components/AdminPanel";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <div className="min-w-64 mr-4">
        <AdminPanel />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
