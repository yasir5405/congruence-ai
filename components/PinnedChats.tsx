import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const PinnedChats = ({ chats }: { chats: string[] }) => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Pinned Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((chat, idx) => (
          <SidebarMenuItem>
            <SidebarMenuButton>
              <p className="truncate">{chat}</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default PinnedChats;
