import CreatorPanel from "@/components/CreatorPanel";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <div className="min-w-64 mr-4">
        <CreatorPanel />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
