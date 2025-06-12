"use client";

import { type LucideIcon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isAdmin?: boolean;
  }[];
}) {
  const { data: session } = useSession();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible
            key={index}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            {session?.user?.role == "admin" ? (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    redirect(item.url);
                  }}
                  tooltip={item.title}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              session?.user?.role == "user" &&
              !item.isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      redirect(item.url);
                    }}
                    tooltip={item.title}
                    className="cursor-pointer"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
