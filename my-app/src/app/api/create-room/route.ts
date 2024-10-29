import RoomSchema from "@/models/RoomSchema";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose, { Mongoose } from "mongoose";
import { NextResponse } from "next/server";


interface RoomData {
    name: string;
    roomId: string;
    participantId : string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const roomData: RoomData = body;

        await connectToDatabase();
        // Initialize models
        const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
        const newRoom = new Room({
            room_id: roomData.roomId,
            host_name: roomData.name,
            participants: [roomData.participantId], 
            createdAt: new Date().toLocaleString("en-US", {timeZone: "Asia/Calcutta"})
        });

        // Save the room
        const savedRoom = await newRoom.save();

        return NextResponse.json({
            message: "Room created successfully",
            room: savedRoom,
            // participant: savedParticipant
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating room: ", error);
        return NextResponse.json({
            message: "Failed to create room",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}