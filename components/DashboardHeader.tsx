import ChatSearch from "./ChatSearch";
import { ThemeSwitcher } from "./theme-switcher";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const DashboardHeader = () => {
  return (
    <nav className="w-full py-3 flex items-center justify-between">
      <div className="flex items-center gap-8 md:gap-2 w-full">
        <h1 className="hidden md:block">Chats</h1>
        <ChatSearch
          placeholder="Search in this chat..."
          className="w-full md:w-lg lg:w-lg"
        />
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div tabIndex={0} className="flex items-center">
            <SidebarTrigger className="md:hidden lg:hidden" />
          </div>
        </TooltipTrigger>
        <TooltipContent>Open Sidebar</TooltipContent>
      </Tooltip>
      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default DashboardHeader;
