import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {};

export default async function NavDesktopLoggedAdminItems({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || !(user.role == "ADMIN")) {
    return null;
  }

  return (
    <>
      <Link href={"/admin"} className={buttonVariants({ variant: "ghost" })}>
        Admin Panel
      </Link>
    </>
  );
}