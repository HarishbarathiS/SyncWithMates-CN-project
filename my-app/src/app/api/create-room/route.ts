import RoomSchema from "@/models/RoomSchema";
import { connectToDatabase } from "@/lib/mongodb";
import  mongoose  from "mongoose";
import { NextResponse } from "next/server";

interface RoomData {
    name : string,
    roomId : string,
} 

export async function POST(req : Request) {
    try {
        const body = await req.json()
        const roomData : RoomData  = body;
        await connectToDatabase();
        const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
        
        const newRoom = new Room({
            room_id : roomData.roomId,
            host_name : roomData.name,
            paraticipants : [],
            createdAt : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        });

        await newRoom.save();

        return NextResponse.json({message : "Room created successfully", room : newRoom }, {status : 201})
    } catch (error) {
        console.error("Error creating room : ", error)
        return NextResponse.json({message : "Failed to create room"}, {status : 500})
    }
}