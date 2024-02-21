import { getAuthSession } from "@/lib/auth";

type Props = {}

export default async function page({}: Props) {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <div>
      <div>{user ? <h1>{user.email}</h1> : null}</div>

      <div>
        Admin: {user?.role === "ADMIN" ? "Yes" : "No"}
      </div>
    </div>
  )
}