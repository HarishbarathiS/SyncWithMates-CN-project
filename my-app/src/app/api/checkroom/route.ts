import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import RoomSchema from "@/models/RoomSchema";

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export async function POST(req : Request) {
    try{
        const {roomId} = await req.json();
        await connectToDatabase();
        const getRoom = await Room.findOne({room_id : roomId})

        if(!getRoom){
            return NextResponse.json({message : "Room not found"}, {status : 404});
        }

        return NextResponse.json(getRoom);
    } catch (error) {
        console.error("Error finding room:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}