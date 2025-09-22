import { AppSidebar } from "@/components/app-sidebar";
import ChatBox from "@/components/ChatBox";
import DashboardHeader from "@/components/DashboardHeader";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
          <div className="flex flex-col h-dvh">
            <div className="px-4 md:px-20 lg:px-44 py-3">
              <DashboardHeader />
              <Separator />
            </div>

            <div className="flex-1 relative overflow-y-auto px-4 md:px-20 lg:px-44 py-2 custom-scrollbar">
              <ChatBox session={session}/>
            </div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
