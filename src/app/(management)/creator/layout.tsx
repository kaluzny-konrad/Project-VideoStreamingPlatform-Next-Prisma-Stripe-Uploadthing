import CreatorPanel from "@/components/creator/CreatorPanel";
import CreatorPanelMobileModal from "@/components/creator/CreatorPanelMobileModal";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-col lg:flex-row">
        <div>
          <div className="mr-4 hidden lg:block">
            <CreatorPanel />
          </div>
          <div className="block mb-4 lg:hidden">
            <CreatorPanelMobileModal />
          </div>
        </div>
        <div className="w-full rounded-xl bg-white p-4">
          {children}
        </div>
      </div>
    </WrapperMaxWidth>
  );
}
