"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { trpc } from "@/server/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavMobileMenu() {
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userDataError,
  } = trpc.user.getUserData.useQuery();

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

        {userData && (
          <>
            <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
              <Link href={"/watch"}>Watch course</Link>
            </DropdownMenuItem>
            {userData.role == "CREATOR" || userData.role == "ADMIN" ? (
              <>
                <DropdownMenuSeparator className="" />
                <DropdownMenuItem asChild className="py-2 pr-10 cursor-pointer">
                  <Link href={"/creator"}>Creator Panel</Link>
                </DropdownMenuItem>
              </>
            ) : null}
            {userData.role == "ADMIN" ? (
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
