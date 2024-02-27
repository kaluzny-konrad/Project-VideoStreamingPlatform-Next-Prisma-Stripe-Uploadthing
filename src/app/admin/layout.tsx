import AdminPanel from "@/components/AdminPanel";
import CreatorPanel from "@/components/CreatorPanel";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getAuthSession();
  // const user = session?.user;

  // if (!user || !(user.role == "ADMIN")) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="flex flex-row p-2 ">
      <div className="w-64 mr-4">
        <AdminPanel />
      </div>
      <div className="w-[50em]">{children}</div>
    </div>
  );
}
