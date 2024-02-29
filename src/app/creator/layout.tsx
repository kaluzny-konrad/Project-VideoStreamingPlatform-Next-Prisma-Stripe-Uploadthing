import CreatorPanel from "@/components/CreatorPanel";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row p-2 ">
      <div className="w-64 mr-4">
        <CreatorPanel />
      </div>
      <div className="w-[50em]">{children}</div>
    </div>
  );
}
