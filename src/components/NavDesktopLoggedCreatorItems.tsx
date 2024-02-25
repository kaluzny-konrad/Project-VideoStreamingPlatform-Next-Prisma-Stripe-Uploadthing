import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {};

export default async function NavDesktopLoggedCreatorItems({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || !(user.role == "ADMIN" || user.role == "CREATOR")) {
    return null;
  }



  return (
    <>
      <Link href={"/creator"} className={buttonVariants({ variant: "ghost" })}>
        Creator Panel
      </Link>
    </>
  );
}
