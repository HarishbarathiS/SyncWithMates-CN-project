"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface RoomPageProps {
  params: {
    id: string;
  };
}

function Room({ params }: RoomPageProps) {
  const [message, setMessage] = useState("");

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
          className="w-full max-w-[90vw] max-h-[calc(100%-5px)] rounded-lg border"
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
              <DropdownMenuTrigger className="flex flex-row text-white text-lg mt-1 h-10 mx-4 items-center justify-center">
                Participants Online
                <div className="mx-4 bg-lime-500 rounded-full w-7">7</div>
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
            {/* </div> */}
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <Input
              className="h-11 mt-auto mx-5 mb-5 text-md rounded bg-zinc-700 text-white items-center justify-center"
              id="message"
              placeholder="Message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Room;
