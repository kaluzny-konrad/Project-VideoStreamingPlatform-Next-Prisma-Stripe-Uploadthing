import AdminPanel from "@/components/AdminPanel";
import WrapperMaxWidth from "@/components/WrapperMaxWidth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-col lg:flex-row">
        <div className="hidden w-1/4 lg:block mr-4">
          <AdminPanel />
        </div>
        <div className="w-full lg:w-3/4 p-4 bg-white rounded-xl">{children}</div>
      </div>
    </WrapperMaxWidth>
  );
}
