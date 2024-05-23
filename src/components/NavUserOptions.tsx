import { getAuthSession } from "@/lib/auth";
import NavUserOptionsLoggedOut from "./NavUserOptionsLoggedOut";
import NavUserOptionsLoggedIn from "./NavUserOptionsLoggedIn";

export default async function NavUserOptions() {
  const session = await getAuthSession();

  if (!session?.user) return <NavUserOptionsLoggedOut />;

  const user = session?.user;
  const email = user?.email;
  const image = user?.image;

  return (
    <NavUserOptionsLoggedIn
      user={{
        email: email,
        image: image,
      }}
    />
  );
}
