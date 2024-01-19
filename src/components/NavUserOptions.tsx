import { getAuthSession } from "@/lib/auth";
import NavUserOptionsLoggedOut from "./NavUserOptionsLoggedOut";
import NavUserOptionsLoggedIn from "./NavUserOptionsLoggedIn";

type Props = {};

export default async function NavUserOptions({}: Props) {
  const session = await getAuthSession();

  if (!session?.user) return <NavUserOptionsLoggedOut />;

  const user = session?.user;
  const username = user?.username;
  const email = user?.email;
  const image = user?.image;

  return (
    <NavUserOptionsLoggedIn
      user={{
        username: username,
        email: email,
        image: image,
      }}
    />
  );
}
