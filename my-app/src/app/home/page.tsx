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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            {/* <div className="flex flex-col space-y-1.5"> */}
            {/* <Label htmlFor="name">Name</Label> */}
            {/* <Input id="name" placeholder="Name of your project" /> */}
            <div className="flex flex-col gap-10">
              <Button variant="outline" className="text-md">
                Create a Room
              </Button>
              <Button className="text-md">Join a room</Button>
            </div>
            {/* </div> */}
            {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
