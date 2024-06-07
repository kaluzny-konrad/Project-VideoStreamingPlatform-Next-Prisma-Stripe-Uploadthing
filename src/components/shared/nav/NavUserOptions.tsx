import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { buttonVariants } from "@/components/ui/button";

export default async function NavUserOptions() {
  return (
    <div className="flex items-center">
      <SignedOut>
        <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
          Sign In
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
