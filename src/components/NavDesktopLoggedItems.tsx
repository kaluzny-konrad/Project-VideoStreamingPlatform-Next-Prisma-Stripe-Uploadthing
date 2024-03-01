import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {};

export default async function NavDesktopLoggedItems({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;
  if (!user) {
    return null;
  }

  return (
    <>
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
