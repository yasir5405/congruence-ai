"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarMenuButton, useSidebar } from "./ui/sidebar";
import CtrlKeyIcon from "@/icons/CtrlKeyIcon";
import { cn } from "@/lib/utils";

type SearchQuery = {
  query: string;
};

const ChatSearch = ({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) => {
  const { register, handleSubmit, setFocus } = useForm<SearchQuery>();

  const { state } = useSidebar();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setFocus("query");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setFocus]);

  const searchChat = async ({ query }: SearchQuery) => {
    console.log(query);
  };

  return (
    <form
      onSubmit={handleSubmit(searchChat)}
      className={cn("relative", className)}
    >
      {state === "collapsed" ? (
        <SidebarMenuButton asChild tooltip="Search chats">
          <button
            type="button"
            className="flex items-center justify-center p-2"
          >
            <Search />
          </button>
        </SidebarMenuButton>
      ) : (
        <>
          <Input
            id="query"
            type="text"
            placeholder={placeholder ?? "Search for chats..."}
            className="pl-8 pr-10 placeholder:text-xs"
            {...register("query", { required: true })}
          />

          <Search
            className="absolute top-1/2 -translate-y-1/2 left-3 size-4 cursor-pointer"
            onClick={() => {
              setFocus("query");
            }}
          />

          <div className="flex items-center justify-center gap-0.5 absolute top-1/2 -translate-y-1/2 right-3">
            <CtrlKeyIcon />
            <p className="text-xs font-semibold">K</p>
          </div>
        </>
      )}
    </form>
  );
};

export default ChatSearch;
