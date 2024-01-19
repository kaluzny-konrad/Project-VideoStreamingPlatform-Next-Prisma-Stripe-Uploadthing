"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import IconLoader from "./IconLoader";

type Props = {};

export default function AuthUserForm({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={loginWithGoogle} disabled={isLoading} size="sm">
        <IconLoader isLoading={isLoading} />
        Google
      </Button>
    </div>
  );
}
