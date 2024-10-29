import { connectToDatabase } from "@/lib/mongodb";
import RoomSchema from "@/models/RoomSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface ParticipantData {
    roomId: string;
    participantId : mongoose.Types.ObjectId;
}


export async function POST(req:Request) {
    try {
        const body = await req.json();
        const participantData : ParticipantData = body;

        await connectToDatabase();

        const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
        const getAndUpdateRoom = await Room.findOneAndUpdate(
            {room_id : participantData.roomId},
            {$push : {participants : participantData.participantId}},
            {new : true}
        ).lean();
        

        if (!getAndUpdateRoom) {
            return NextResponse.json({ 
                message: "Room not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            message: "Participant added successfully",
            room: getAndUpdateRoom
        }, { status: 200 });
    } catch(error){
        console.error("Error finding room:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};