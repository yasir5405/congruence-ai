import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ButtonPropsInterface } from "./app-sidebar";
import { useRouter } from "next/navigation";
import CtrlKeyIcon from "@/icons/CtrlKeyIcon";

const SidebarButtons = ({ items }: { items: ButtonPropsInterface[] }) => {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, idx) => (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton
              onClick={() => router.push(item.url)}
              tooltip={item.name}
            >
              <item.icon />
              <p>{item.name}</p>
              <div className="flex items-center justify-between gap-0.5 ml-auto">
                <CtrlKeyIcon />
                <p className="text-sm font-medium">{idx + 1}</p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SidebarButtons;
