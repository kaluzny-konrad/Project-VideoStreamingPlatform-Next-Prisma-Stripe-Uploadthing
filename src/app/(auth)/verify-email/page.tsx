import Image from "next/image";
import React from "react";
import VerifyEmail from "@/components/VerifyEmail";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function VerifyEmailPage({ searchParams }: Props) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="pt-20 mx-auto w-full sm:w-[400px]">
      {token && typeof token === "string" ? (
        <VerifyEmail token={token} />
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <div className="relative h-60 w-60">
            <Image
              src="/hippo-email-sent.png"
              fill
              alt="hippo email sent image"
            />
          </div>

          <h3 className="text-2xl font-semibold">Check your email</h3>

          <div className="text-muted-foreground">
            {toEmail ? (
              <p>
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p>
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">your email</span>.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
