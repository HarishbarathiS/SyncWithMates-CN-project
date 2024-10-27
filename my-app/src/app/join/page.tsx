"use client";

import React, { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@radix-ui/react-toast";

export default function Join() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  async function checkRoom(roomId: String): Promise<boolean> {
    try {
      const res = await fetch("/api/checkroom", {
        method: "POST",
        body: JSON.stringify({ roomId }),
      });

      if (!res.ok) {
        throw new Error("Room not found");
      }

      const data = await res.json();
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error checking room:", error);
      return false;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (await checkRoom(roomId)) {
      if (name != "" && roomId != "") {
        router.push(`/room/${roomId}`);
      }
    } else {
      console.log("Room not found - showing toast notification");
      toast({
        variant: "destructive",
        title: "Oops!! Room id doesn't exist",
        description: "Try again with existing Room id",
        duration: 1000,
      });
    }
  };
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-zinc-700">
      <Card className="w-[500px] h-[350px]">
        <CardHeader>
          <CardDescription>
            You are one step before entering the watch party !!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5 ">
                <Label className="text-lg" htmlFor="name">
                  Name
                </Label>
                <Input
                  className="h-11 text-md"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-lg" htmlFor="roomid">
                  Room id
                </Label>
                <Input
                  className="h-11 text-md"
                  id="roomid"
                  placeholder="Enter the room id"
                  value={roomId}
                  onChange={(e) => {
                    setRoomId(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between flex items-center p-6 pt-9">
              <Link href="/home" legacyBehavior passHref>
                <Button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  Back
                </Button>
              </Link>

              <Button
                type="submit"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Enter room
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
