import CreatorPanel from "@/components/CreatorPanel";
import WrapperMaxWidth from "@/components/WrapperMaxWidth";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WrapperMaxWidth>
      <div className="flex flex-row">
        <div className="min-w-64 mr-4">
          <CreatorPanel />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </WrapperMaxWidth>
  );
}
