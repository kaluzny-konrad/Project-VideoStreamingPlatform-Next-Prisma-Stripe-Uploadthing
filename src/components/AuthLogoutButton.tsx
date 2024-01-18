"use client";

import { signOut } from "next-auth/react";

type Props = {};

export default function AuthLogoutButton({}: Props) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        signOut();
      }}
    >
      Logout
    </button>
  );
}
