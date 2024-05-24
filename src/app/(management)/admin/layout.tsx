import AdminPanel from "@/components/AdminPanel";
import WrapperMaxWidth from "@/components/WrapperMaxWidth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-row">
        <div className="min-w-64 mr-4">
          <AdminPanel />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </WrapperMaxWidth>
  );
}
