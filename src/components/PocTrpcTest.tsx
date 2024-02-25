'use client'

import { trpc } from "@/server/client";
import React from "react";

type Props = {};

export default function PocTrpcTest({}: Props) {
  const {
    data: publicTest,
    isLoading: publicLoading,
    error: errorPublic,
  } = trpc.test.getTest.useQuery();

  const {
    data: privateTest,
    isLoading: privateLoading,
    error: errorPrivate,
  } = trpc.test.getPrivateTest.useQuery();

  return (
    <div>
      <div>
        <h1>Public test</h1>
        <p>{publicLoading ? "Loading..." : publicTest}</p>
        {errorPublic && <p>Error: {errorPublic.message}</p>}
      </div>

      <div>
        <h1>Private test</h1>
        <p>{privateLoading ? "Loading..." : privateTest}</p>
        {errorPrivate && <p>Error: {errorPrivate.message}</p>}
      </div>
    </div>
  );
}
