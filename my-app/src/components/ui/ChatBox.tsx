import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  content: string | null;
  sender: string | null;
}

interface ChatBoxProps {
  messageData: Message[];
}

export function ChatBox({ messageData }: ChatBoxProps) {
  // If messageData is undefined or null, return an empty div
  if (!messageData) {
    return <div className="flex flex-col space-y-4 w-full max-w-md"></div>;
  }

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      {messageData.map((msg, index) => (
        <div
          key={index}
          className="flex flex-col py-2 px-4 rounded-md bg-zinc-800"
        >
          {msg.sender && (
            <span className="text-zinc-400 text-lime-400 text-md mb-1">
              {msg.sender}
            </span>
          )}
          {msg.content && (
            <span className="text-white break-words">{msg.content}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
