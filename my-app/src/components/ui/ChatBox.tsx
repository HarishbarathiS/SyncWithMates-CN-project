import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageData {
  messages: string[];
}

export function ChatBox({ messages }: MessageData) {
  return (
    <div className="flex flex-col mx-auto text-white font-semibold bg-zinc-700 gap-4 w-full max-w-md rounded-md p-1">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="flex py-2 px-4 mx-auto ml-0 rounded-md bg-zinc-800"
        >
          {msg}
        </div>
      ))}
    </div>
  );
}
