import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

type Props = {};

export default function NavUserOptionsLoggedOut({}: Props) {
  return (
    <Link href="/sign-in" className={buttonVariants()}>
      Sign In
    </Link>
  );
}
