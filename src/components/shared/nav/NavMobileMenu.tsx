"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  isUser: boolean;
  isCreator: boolean;
  isAdmin: boolean;
};

export default function NavMobileMenu({ isUser, isCreator, isAdmin }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <MenuIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="start">
        <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
          <Link href={"/courses"}>Explore</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="" />

        {isUser && (
          <>
            <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
              <Link href={"/watch"}>Watch course</Link>
            </DropdownMenuItem>
            {isCreator ? (
              <>
                <DropdownMenuSeparator className="" />
                <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
                  <Link href={"/creator"}>Creator Panel</Link>
                </DropdownMenuItem>
              </>
            ) : null}
            {isAdmin ? (
              <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
                <Link href={"/admin"}>Admin Panel</Link>
              </DropdownMenuItem>
            ) : null}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
