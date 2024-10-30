"use client";

import { Button } from "@/components/ui/button";
import mongoose from "mongoose";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardStackIcon, RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Create() {
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();

  // generates room id
  useEffect(() => {
    const id = uuidv4();
    setRoomId(id.slice(0, 6));
  }, []);

  async function createRoom(participantId: mongoose.Types.ObjectId) {
    try {
      const res = await fetch("/api/create-room", {
        method: "POST",
        body: JSON.stringify({ name, roomId, participantId }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Room create successfully", data);
      } else {
        const errorData = await res.json();
        console.error("Error creating room", errorData.message);
      }
    } catch (error) {
      console.error("An unexpected error occured : ", error);
    }
  }

  async function createParticipant() {
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify({ name, roomId }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Participant created successfully", data);
        return data.participant.user_id;
      } else {
        const errorData = await res.json();
        console.error("Error creating participant", errorData.message);
      }
    } catch (error) {
      console.error("An unexpected error occured : ", error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const participantId: mongoose.Types.ObjectId = await createParticipant();
    createRoom(participantId);
    if (name != "") {
      if (window && window.sessionStorage) {
        sessionStorage.setItem("username", name);
      }
      router.push(`/room/${roomId}`);
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
            <div className="grid w-full items-center gap-6">
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
                <Alert>
                  {/* <RocketIcon className="h-5 w-5 bg-white" /> */}
                  <AlertTitle>Heads up magic code is here !</AlertTitle>
                  <AlertDescription>Room Code - {roomId}</AlertDescription>
                </Alert>
              </div>
            </div>
            <div className="flex justify-between flex items-center p-6 pt-4">
              <Link href="/home" as="/home" legacyBehavior passHref>
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
