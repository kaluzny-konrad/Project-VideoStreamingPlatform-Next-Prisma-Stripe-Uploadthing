import React from "react";
import WrapperMaxWidth from "./WrapperMaxWidth";
import NavUserOptions from "./NavUserOptions";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <WrapperMaxWidth>
          <div className="border-b border-gray-200">
            <NavUserOptions/>
          </div>
        </WrapperMaxWidth>
      </header>
    </div>
  );
}
