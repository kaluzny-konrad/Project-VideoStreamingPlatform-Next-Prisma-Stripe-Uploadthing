import TrpcTest from "@/components/TrpcTest";
import { getAuthSession } from "@/lib/auth";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <div>
      <div>{user ? <h1>{user.email}</h1> : null}</div>

      <div>
        <TrpcTest />
      </div>
    </div>
  );
}
