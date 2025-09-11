"use client";

import * as React from "react";
import {
  AppWindowMac,
  LibrarySquare,
  type LucideIcon,
  MessageCircle,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import ProfileBox from "./ProfileBox";
import { type Session } from "next-auth";
import ChatSearch from "./ChatSearch";
import { Separator } from "./ui/separator";
import SidebarButtons from "./SidebarButtons";
import PinnedChats from "./PinnedChats";
import ChatHistory from "./ChatHistory";
import { Button } from "./ui/button";

export interface ButtonPropsInterface {
  name: string;
  icon: LucideIcon;
  url: string;
}

const items: ButtonPropsInterface[] = [
  { name: "Chats", icon: MessageCircle, url: "/dashboard/chats" },
  {
    name: "Library",
    icon: LibrarySquare,
    url: "/dashboard/library",
  },
  {
    name: "Apps",
    icon: AppWindowMac,
    url: "/dashboard/apps",
  },
];

const pinnedChats: string[] = [
  "Hello world project",
  "Calculator Project",
  "How to earn money as a freelancer",
  "How to get a jobs in 2025 as a full stack developer",
];

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session }) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProfileBox session={session} />
        <ChatSearch />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarButtons items={items} />
        <PinnedChats chats={pinnedChats} />
        <ChatHistory chats={pinnedChats} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          tooltip="Start new chat"
          className="bg-primary text-white hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer"
        >
          <Plus />
          {state !== "collapsed" && "Start new chat"}
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
