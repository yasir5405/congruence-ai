"use client";

import { useChat } from "@ai-sdk/react";
import UserPromptInput from "./UserPromptInput";

export default function ChatBox() {
  //   const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const submitQuery = (prompt: string) => {
    sendMessage({ text: prompt });
    // setInput("");
  };
  return (
    <div className="flex flex-col h-full">
      {/* Messages container with scroll */}
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap mb-4">
            {message.role === "user" ? "User: " : "AI: "}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
              }
            })}
          </div>
        ))}
      </div>

      {/* Fixed input at bottom */}
      <div className="sticky bottom-0 bg-background pt-4">
        <UserPromptInput onSubmit={submitQuery} />
      </div>
    </div>
  );
}
