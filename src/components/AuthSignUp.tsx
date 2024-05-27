import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AuthLogInGoogle from "./AuthLogInGoogle";

export default function AuthSignUp() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter email and password below to sign up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <AuthLogInGoogle />
        </div>
        <div className="mt-4 text-center text-sm">
          Already has an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
