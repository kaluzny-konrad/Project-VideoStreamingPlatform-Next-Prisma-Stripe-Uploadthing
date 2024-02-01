import Link from "next/link";

type Props = {};

export default function notFound({}: Props) {
  return (
    <main className="flex min-h-screen p-24">
      <h1>Sorry, this site not exists!</h1>
    </main>
  );
}
