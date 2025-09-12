"use client";
import PaperClipIcon from "@/icons/PaperClipIcon";
import { Separator } from "./ui/separator";
import PictureIcon from "@/icons/PictureIcon";
import MicrophoneIcon from "@/icons/MicrophoneIcon";
import GridIcon from "@/icons/GridIcon";
import { Button } from "./ui/button";
import SendIcon from "@/icons/SendIcon";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface UserPromptInput {
  prompt: string;
}

const UserPromptInput = () => {
  const { register, handleSubmit, watch } = useForm<UserPromptInput>();

  const watchPromptValue = watch("prompt", "");
  const disabled = !watchPromptValue.trim();

  const handlePromptSubmission = async ({ prompt }: UserPromptInput) => {
    console.log(prompt);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit(handlePromptSubmission)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePromptSubmission)}
      className="mx-auto flex flex-col focus-within:ring focus-within:ring-primary gap-2 bg-primary-foreground w-full p-2 rounded-md border"
    >
      <textarea
        placeholder="How can I help you?"
        className="resize-none w-full p-2 placeholder:text-base placeholder:md:text-sm outline-none text-base md:text-sm"
        {...register("prompt", { required: true })}
        onKeyDown={onKeyDown}
      />
      <Separator />
      <TooltipProvider>
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-2 items-center p-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0}>
                  <PaperClipIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Attach files</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0}>
                  <PictureIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Generate picture</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0}>
                  <MicrophoneIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>Dictate</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div tabIndex={0}>
                  <GridIcon />
                </div>
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div tabIndex={0}>
                <Button disabled={disabled} type="submit">
                  <SendIcon />
                  Send message
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {disabled
                ? "Please enter a prompt to send message."
                : "Send message"}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </form>
  );
};

export default UserPromptInput;
