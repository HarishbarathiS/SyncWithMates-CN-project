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
import { useRouter } from "next/navigation";
import { ChatBox } from "@/components/ui/ChatBox";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface RoomParams {
  id: string;
}

interface Message {
  content: string | null;
  sender: string | null;
}

function Room({ params }: any) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const roomId = params.id;
  const router = useRouter();

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
    const name = sessionStorage.getItem("username");
    if (!name) {
      router.push("http://localhost:3000/join");
      return;
    }

    // Initialize socket connection
    socketRef.current = io("http://localhost:4000", {
      transports: ["websocket"],
      reconnection: true,
      timeout: 10000,
    });

    // Connection event handlers
    socketRef.current.on("connect", () => {
      console.log("Client connected to socket");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socketRef.current.on("userCount", (data) => {
      setUserCount(data.userCount);
    });

    socketRef.current.on("userNames", (data) => {
      setActiveUsers(data.userNames);
    });

    socketRef.current.on("ClientMessage", (data) => {
      console.log("Message from socket : ", data.data, data.name);
      console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: data.data || "", sender: data.name || "" },
      ]);
    });

    socketRef.current.on("userJoined", (data) => {
      console.log(data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: `${data.name} has joined the room`,
          sender: "",
        },
      ]);
    });

    socketRef.current.on("userLeft", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: `${data.name} has joined the room`,
          sender: "",
        },
      ]);
    });

    // Join room
    socketRef.current.emit("message", {
      type: "join",
      room_id: roomId,
      name: name,
    });

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [roomId, router]);

  function sendToSocketServer(message: Message) {
    const name = sessionStorage.getItem("username");
    if (socketRef.current) {
      socketRef.current.emit("message", {
        type: "message",
        room_id: roomId,
        name: name,
        data: message,
      });
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Append the message locally before sending
      //setMessages((prevMessages) => [...prevMessages, message]);
      const name = sessionStorage.getItem("username");
      sendToSocketServer({ content: message, sender: name });
      //console.log(messages);
      //setMessage(""); // Clear the message input after sending
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
                  {activeUsers.map((name, index) => (
                    <DropdownMenuItem key={index} className="font-semibold">
                      {" "}
                      {name}{" "}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>

            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <ScrollArea
              ref={chatBoxRef}
              className="flex-grow overflow-y-auto p-4 bg-zinc-700"
            >
              <div className="flex flex-col space-y-4 w-full max-w-md s">
                <ChatBox messageData={messages} />
              </div>
            </ScrollArea>
            <div className="flex mt-auto mb-3 max-w-sm items-center justify-center gap-2">
              <Input
                className="flex h-11 w-full mx-auto ml-2 font-semibold text-white"
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
                className="flex h-11 mr-2 bg-zinc-800"
                type="submit"
                onClick={handleSendMessage}
              >
                <LuSend />
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Room;
