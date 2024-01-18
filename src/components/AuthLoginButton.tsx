"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type Props = {};

export default function AuthLoginButton({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <button onClick={loginWithGoogle}>Google</button>;
}
