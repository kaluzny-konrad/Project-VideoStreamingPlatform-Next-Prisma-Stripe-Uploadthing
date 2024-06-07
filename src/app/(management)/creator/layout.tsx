import CreatorPanel from "@/components/creator/CreatorPanel";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-col lg:flex-row">
        <div className="hidden w-1/4 lg:block mr-4">
          <CreatorPanel />
        </div>
        <div className="w-full lg:w-3/4 p-4 bg-white rounded-xl">{children}</div>
      </div>
    </WrapperMaxWidth>
  );
}
