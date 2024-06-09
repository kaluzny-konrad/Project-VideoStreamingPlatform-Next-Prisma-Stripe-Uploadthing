import AdminPanel from "@/components/admin/AdminPanel";
import AdminPanelMobileModal from "@/components/admin/AdminPanelMobileModal";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-col lg:flex-row">
        <div>
          <div className="mr-4 hidden lg:block">
            <AdminPanel />
          </div>
          <div className="block mb-4 lg:hidden">
            <AdminPanelMobileModal />
          </div>
        </div>
        <div className="w-full rounded-xl bg-white p-4">
          {children}
        </div>
      </div>
    </WrapperMaxWidth>
  );
}
