"use client";

import { useChat } from "@ai-sdk/react";
import UserPromptInput from "./UserPromptInput";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";

export default function ChatBox({ session }: { session: Session }) {
  const { messages, sendMessage } = useChat();
  const messageRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>(
    []
  );
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const submitQuery = (prompt: string) => {
    setIsThinking(true); // Start thinking state
    sendMessage({ text: prompt });
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedMessages, isThinking]);

  // Handle typing animation for new messages
  useEffect(() => {
    if (messages.length === 0) {
      setDisplayedMessages([]);
      setIsThinking(false);
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const previousMessages = messages.slice(0, -1);

    // If it's a user message, show immediately
    if (lastMessage.role === "user") {
      setDisplayedMessages(messages);
      setIsTyping(false);
      // Keep thinking state until AI responds
      return;
    }

    // If it's an AI message, stop thinking and animate the typing
    if (lastMessage.role === "assistant") {
      setIsThinking(false); // Stop thinking when AI response starts

      const fullText = lastMessage.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");

      if (fullText) {
        setIsTyping(true);
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            const partialText = fullText.substring(0, currentIndex);

            const animatedMessage = {
              ...lastMessage,
              parts: [{ type: "text" as const, text: partialText }],
            };

            setDisplayedMessages([...previousMessages, animatedMessage]);
            currentIndex += 2; // Adjust speed by changing this value
          } else {
            clearInterval(typingInterval);
            setDisplayedMessages(messages); // Show complete message
            setIsTyping(false);
          }
        }, 30); // Adjust typing speed here (lower = faster)

        return () => clearInterval(typingInterval);
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 pb-4 space-y-4">
        {displayedMessages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-muted mr-12"
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {message.role === "user" ? session.user.name : "AI"}
              </div>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="whitespace-pre-wrap"
                      >
                        {part.text}
                        {/* Show typing cursor for the last AI message being typed */}
                        {message.role === "assistant" &&
                          index === displayedMessages.length - 1 &&
                          isTyping && (
                            <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse">
                              |
                            </span>
                          )}
                      </div>
                    );
                }
              })}
            </div>
          </div>
        ))}

        {/* Thinking state */}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted mr-12">
              <div className="text-sm font-medium mb-1">AI</div>
              <div className="flex items-center space-x-2">
                <span className="animate-shimmer bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-[length:200%_100%] bg-clip-text text-transparent">
                  Thinking...
                </span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messageRef} />
      </div>

      {/* Fixed input at bottom */}
      <div className="sticky bottom-0 bg-background pt-4">
        <UserPromptInput onSubmit={submitQuery} />
      </div>
    </div>
  );
}
