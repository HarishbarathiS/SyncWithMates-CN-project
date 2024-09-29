import React from "react";
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

export default function Join() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-zinc-700">
      <Card className="w-[500px] h-[350px]">
        <CardHeader>
          <CardDescription>
            You are one step before entering the watch party !!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5 ">
                <Label className="text-lg" htmlFor="name">
                  Name
                </Label>
                <Input
                  className="h-11 text-md"
                  id="name"
                  placeholder="Enter your name"
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
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/home" legacyBehavior passHref>
            <Button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
              Back
            </Button>
          </Link>
          <Button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            Enter room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
