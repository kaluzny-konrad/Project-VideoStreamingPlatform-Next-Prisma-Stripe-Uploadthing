import CreatorPanel from "@/components/creator/CreatorPanel";
import CreatorPanelMobileModal from "@/components/creator/CreatorPanelMobileModal";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="m-4 block lg:hidden">
        <CreatorPanelMobileModal />
      </div>
      <WrapperMaxWidth className="my-4 bg-white py-4 lg:bg-transparent">
        <div className="mb-4 flex flex-col lg:flex-row">
          <div>
            <div className="mr-4 hidden lg:block">
              <CreatorPanel />
            </div>
          </div>
          <div className="w-full rounded-xl bg-none lg:bg-white lg:p-4">
            {children}
          </div>
        </div>
      </WrapperMaxWidth>
    </>
  );
}
