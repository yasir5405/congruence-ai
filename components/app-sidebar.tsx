"use client";

import * as React from "react";
import {
  AppWindowMac,
  Frame,
  LibrarySquare,
  type LucideIcon,
  Map,
  MessageCircle,
  PieChart,
  Plus,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const items: ButtonPropsInterface[] = [
  { name: "Chats", icon: MessageCircle, url: "/dashboard/chats" },
  {
    name: "Libarary",
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
        {/* <NavUser user={data.user} /> */}
        <Button>
          <Plus />
          Start new chat
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
