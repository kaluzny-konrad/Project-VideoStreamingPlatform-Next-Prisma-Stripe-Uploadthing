import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import React from "react";

type Props = {};

export default async function page({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  return <div>admin access !</div>;
}
