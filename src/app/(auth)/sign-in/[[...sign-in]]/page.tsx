import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import AuthSignIn from "@/components/auth/AuthSignIn";
import { buttonVariants } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div>
      <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        Home
      </Link>

      <AuthSignIn />
    </div>
  );
}
