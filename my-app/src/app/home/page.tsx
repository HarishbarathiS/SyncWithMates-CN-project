"use client";
import React, { useState, useEffect } from "react";
import "../styles/flowingBorder.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-zinc-700">
      <Card className="w-[500px] h-[350px]">
        <CardHeader className="mb-10">
          <CardTitle>Welcome to SyncWithMates</CardTitle>
          <CardDescription>Create or Join a room ?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center ">
            <div className="flex flex-col gap-10">
              <Link href="/create" as="/create" legacyBehavior passHref>
                <Button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  Create a Room
                </Button>
              </Link>
              <Link href="/join" as="/join" legacyBehavior passHref>
                <Button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  Join a Room
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
