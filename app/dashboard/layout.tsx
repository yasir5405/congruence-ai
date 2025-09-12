import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserPromptInput from "@/components/UserPromptInput";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar session={session} />
        <SidebarInset>
          <div className="flex flex-col h-dvh px-4 md:px-20 lg:px-44 py-3">
            <div className="w-full flex items-center">
              <SidebarTrigger className="md:hidden lg:hidden" />
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            <UserPromptInput />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
