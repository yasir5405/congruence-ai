import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <SidebarInset className="p-2">
        <div className="w-full flex items-center">
          <SidebarTrigger className="md:hidden lg:hidden" />
          <h1>Welcome {session.user.name?.split(" ")[0]}</h1>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
