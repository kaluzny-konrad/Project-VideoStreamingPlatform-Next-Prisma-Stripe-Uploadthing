import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "./ui/button";

export default async function NavDesktopLoggedItems() {
  const session = await getAuthSession();
  const user = session?.user;
  if (!user) {
    return null;
  }

  return (
    <>
      {user.role == "USER" || user.role == "CREATOR" || user.role == "ADMIN" ? (
        <>
          <Link
            href={"/watch"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Watch course
          </Link>
        </>
      ) : null}
      {user.role == "CREATOR" || user.role == "ADMIN" ? (
        <>
          <Link
            href={"/creator"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Creator Panel
          </Link>
        </>
      ) : null}
      {user.role == "ADMIN" ? (
        <>
          <Link
            href={"/admin"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Admin Panel
          </Link>
        </>
      ) : null}
    </>
  );
}
