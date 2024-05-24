import WrapperMaxWidth from "./WrapperMaxWidth";
import NavUserOptions from "./NavUserOptions";
import Link from "next/link";
import NavDesktopItems from "./NavDesktopItems";
import Image from "next/image";
import NavMobileMenu from "./NavMobileMenu";

export default function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <WrapperMaxWidth>
          <div className="flex justify-between p-4">
            <div className="lg:hidden flex">
              <NavMobileMenu />
            </div>

            <Link href="/" className="flex items-center">
              <Image
                className="h-8"
                src="/favicon-32x32.png"
                alt="Logo"
                width={32}
                height={32}
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
