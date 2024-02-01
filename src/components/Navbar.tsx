import React from "react";
import WrapperMaxWidth from "./WrapperMaxWidth";
import NavUserOptions from "./NavUserOptions";
import Link from "next/link";
import NavDesktopItems from "./NavDesktopItems";
import NavMobileHamburger from "./NavMobileHamburger";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <WrapperMaxWidth>
          <div className="border-b border-gray-200 flex justify-between p-4">
            <div className="lg:hidden">
              <NavMobileHamburger />
            </div>

            <Link href="/">
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Logo"
              />
            </Link>

            <div className="hidden lg:block">
              <NavDesktopItems />
            </div>

            <NavUserOptions />
          </div>
        </WrapperMaxWidth>
      </header>
    </div>
  );
}
