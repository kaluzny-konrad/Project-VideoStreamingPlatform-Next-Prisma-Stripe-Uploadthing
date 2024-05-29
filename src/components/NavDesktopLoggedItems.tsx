import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {
  isUser: boolean;
  isCreator: boolean;
  isAdmin: boolean;
};

export default async function NavDesktopLoggedItems({ 
  isUser,
  isAdmin,
  isCreator,
 }: Props) {

  return (
    <>
      {isUser ? (
        <>
          <Link
            href={"/watch"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Watch course
          </Link>
        </>
      ) : null}
      {isCreator ? (
        <>
          <Link
            href={"/creator"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Creator Panel
          </Link>
        </>
      ) : null}
      {isAdmin ? (
        <>
          <Link
            href={"/admin"}
            className={buttonVariants({ variant: "ghost" })}
          >
            Admin Panel
          </Link>
        </>
      ) : null}
    </>
  );
}
