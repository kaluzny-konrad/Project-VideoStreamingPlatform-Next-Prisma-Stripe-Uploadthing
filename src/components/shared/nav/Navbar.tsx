import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

import { buttonVariants } from "@/components/ui/button";
import WrapperMaxWidth from "@/components/shared/WrapperMaxWidth";
import NavUserOptions from "@/components/shared/nav/NavUserOptions";
import NavMobileMenu from "@/components/shared/nav/NavMobileMenu";
import NavDesktopLoggedItems from "@/components/shared/nav/NavDesktopLoggedItems";

export default async function Navbar() {
  const user = await currentUser();
  const isUser = user !== null;
  const isAdmin = user?.publicMetadata.role === "admin";
  const isCreator = user?.publicMetadata.role === "creator" || isAdmin;

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <WrapperMaxWidth>
          <div className="flex justify-between p-4">
            <div className="lg:hidden flex">
              <NavMobileMenu
                isUser={isUser}
                isAdmin={isAdmin}
                isCreator={isCreator}
              />
            </div>

            <Link href="/" className="flex items-center">
              <Image
                className="h-8"
                src="/favicon-32x32.png"
                alt="Logo"
                width={32}
                height={32}
                priority
              />
            </Link>

            <div className="hidden lg:block">
              <div className="w-96 flex flex-row justify-end items-center">
                <Link
                  href={"/courses"}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Explore
                </Link>
                <NavDesktopLoggedItems
                  isUser={isUser}
                  isAdmin={isAdmin}
                  isCreator={isCreator}
                />
              </div>
            </div>

            <NavUserOptions />
          </div>
        </WrapperMaxWidth>
      </header>
    </div>
  );
}
