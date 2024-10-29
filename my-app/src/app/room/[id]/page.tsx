"use client";

import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatBox } from "@/components/ui/ChatBox";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRouter } from "next/router";

interface RoomPageProps {
  params: {
    id: string;
  };
}

function Room({ params }: RoomPageProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [userCount, setUserCount] = useState(0);
  const roomId = params.id;

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Scroll to the bottom of ChatBox whenever messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      const scrollContainer = chatBoxRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    // Create socket connection
    socketRef.current = io("http://localhost:4000", {
      transports: ["websocket"],
      reconnection: true,
    });

    // Connection event handlers
    socketRef.current.on("connect", () => {
      console.log("Client connected to socket");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socketRef.current.on("message", (data) => {
      console.log("Message received from server :", data.count);
      setUserCount(data.count);
    });

    socketRef.current.emit("message", "this is harish");

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex flex-row flex-wrap shadow-md items-center p-5 bg-zinc-700 text-white text-lg font-sans">
        <div className="flex ml-10 mr-auto">SyncWithMates.io</div>
        <div className="flex flex-wrap space-x-20">
          <Button className="bg-zinc-700" variant="outline">
            Leave Room
          </Button>
          <Button className="bg-zinc-700" variant="outline">
            New Room
          </Button>
          <Button className="bg-zinc-700" variant="outline">
            Invite Friends
          </Button>
        </div>
      </div>

      {/* Resizable Panel */}
      <div className="flex-grow flex items-center justify-center mt-5 mb-5 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full max-w-[90vw] max-h-[calc(100%-5px)] rounded-lg"
        >
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Streaming Screen</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            className="flex flex-col bg-zinc-700"
            defaultSize={25}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row text-white text-lg mt-1 h-10 mx-4 font-bold items-center justify-center">
                Participants Online
                <div className="mx-4 bg-lime-500 rounded-full w-7">
                  {userCount}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <ScrollArea className="h-[200px] w-auto rounded-md p-4">
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                  <DropdownMenuLabel>Harish</DropdownMenuLabel>

                  <DropdownMenuLabel>Harish</DropdownMenuLabel>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <ScrollArea
              ref={chatBoxRef}
              className="flex-grow overflow-y-auto p-4 bg-zinc-700"
            >
              <ChatBox messages={messages} />
            </ScrollArea>
            <div className="flex mt-auto mb-3 max-w-sm items-center justify-center gap-2">
              <Input
                className="flex h-11 w-full mx-auto ml-2 font-semibold text-white"
                // className="h-11 flex-shrink-0 mx-5 mb-5 mt-auto text-md rounded bg-zinc-700 text-white items-center justify-center"
                id="message"
                placeholder="Message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                required
              />
              <Button
                className="flex h-11 mr-2 bg-zinc-800rish"
                type="submit"
                onClick={handleSendMessage}
              >
                <LuSend />{" "}
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Room;
