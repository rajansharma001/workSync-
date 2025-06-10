"use client";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { SidebarMenu } from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function NavUser() {
  const { data: session } = useSession();
  const userData = session?.user;

  return (
    <SidebarMenu>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <img src={userData?.image} alt={userData?.name} />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {userData?.name} {userData?.role}
            </span>
            <span className="truncate text-xs">{userData?.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <Button
        className="cursor-pointer w-full"
        onClick={() => {
          signOut();
          redirect("/login");
        }}
      >
        Logout
      </Button>
    </SidebarMenu>
  );
}
