"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { buttonVariants } from "./ui/button";
import { trpc } from "@/server/client";

export default function NavMobileHamburger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const {
    data: userData,
    isLoading: userIsLoading,
    error: userDataError,
  } = trpc.user.getUserData.useQuery();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that wont change (were already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400"
      >
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed inset-0 z-40 flex">
        <div className="w-full">
          <div className="flex flex-col bg-white shadow-xl" ref={navRef}>
            <div className="flex pl-8 pt-6 pb-6 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 "
              >
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 p-8">
              <ul className="">
                <li className="">
                  <Link
                    href={"/courses"}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "lg",
                      className: "w-full text-lg",
                    })}
                  >
                    Explore
                  </Link>
                </li>
                {userData && (
                  <>
                    {userData.role == "USER" ||
                    userData.role == "CREATOR" ||
                    userData.role == "ADMIN" ? (
                      <li>
                        <Link
                          href={"/watch"}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "lg",
                            className: "w-full text-lg",
                          })}
                        >
                          Watch course
                        </Link>
                      </li>
                    ) : null}
                    {userData.role == "CREATOR" || userData.role == "ADMIN" ? (
                      <li>
                        <Link
                          href={"/creator"}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "lg",
                            className: "w-full text-lg",
                          })}
                        >
                          Creator Panel
                        </Link>
                      </li>
                    ) : null}
                    {userData.role == "ADMIN" ? (
                      <li>
                        <Link
                          href={"/admin"}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "lg",
                            className: "w-full text-lg",
                          })}
                        >
                          Admin Panel
                        </Link>
                      </li>
                    ) : null}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
