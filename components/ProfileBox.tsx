"use client";

import * as React from "react";
import { ChevronsUpDown, Settings } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import Image from "next/image";
import ProfileSettingsDropdown from "./ProfileSettingsDropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ProfileBox = ({ session }: { session: Session }) => {
  const { isMobile, state, toggleSidebar } = useSidebar();
  const user = session.user;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent hover:text-inherit"
        >
          <div
            onClick={toggleSidebar}
            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg relative overflow-hidden"
          >
            {user.image && (
              <Image
                src={user.image}
                fill
                alt="user-image"
                className="hover:cursor-e-resize"
              />
            )}
          </div>

          {state === "expanded" && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <p className="truncate font-medium">{user.name}</p>
            </div>
          )}
        </SidebarMenuButton>
        {state === "expanded" && (
          <div className="flex items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-2">
            <Tooltip>
              <div className="p-2 -m-2 hover:bg-muted rounded-md">
                <TooltipTrigger asChild>
                  <div tabIndex={0}>
                    <ProfileSettingsDropdown session={session} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Account Settings</TooltipContent>
              </div>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="cursor-pointer hover:bg-transparent hover:text-inherit" />
              </TooltipTrigger>
              <TooltipContent>Close Sidebar</TooltipContent>
            </Tooltip>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ProfileBox;
