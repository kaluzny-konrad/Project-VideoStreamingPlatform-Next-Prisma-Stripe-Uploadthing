import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Routes:</h1>
      <div className="flex flex-col gap-2">
        <Link href="/upload/add">Upload Add Page</Link>
        <Link href="/trpctest">Trpc Test Page</Link>
        <Link href="/stripetest">Stripe Payment Test</Link>
      </div>
    </main>
  );
}
