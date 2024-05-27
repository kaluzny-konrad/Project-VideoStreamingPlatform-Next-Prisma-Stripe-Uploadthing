"use client";

import { trpc } from "@/server/client";
import { Loader2Icon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {
  token: string;
};

export default function VerifyEmail({ token }: Props) {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (data?.success) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Thank you for verifying your email.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="w-8 h-8 animate-spin text-zinc-300" />
        <h3 className="text-xl font-semibold">Verifying...</h3>
        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full pt-10 space-y-2">
      <XCircleIcon className="w-6 h-6 text-red-800" />
      <div className="text-lg font-semibold">Something went wrong</div>
      <p className="text-sm text-muted-foreground">
        This token is not valid or might be expired. Please try again.
      </p>
    </div>
  );
}
