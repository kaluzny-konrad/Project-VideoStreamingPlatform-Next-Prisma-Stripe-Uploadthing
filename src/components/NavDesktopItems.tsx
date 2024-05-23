import Link from "next/link";
import { buttonVariants } from "./ui/button";
import NavDesktopLoggedItems from "./NavDesktopLoggedItems";

export default function NavDesktopItems() {
  return (
    <div className="w-96 flex flex-row justify-end items-center">
      <Link href={"/courses"} className={buttonVariants({ variant: "ghost" })}>
        Explore
      </Link>
      <NavDesktopLoggedItems />
    </div>
  );
}
