
import { connectToDatabase } from "@/lib/mongodb";;
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ParticipantSchema from "@/models/ParaticipantSchema";

interface ParticipantData {
    name: string;
    roomId: string;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const roomData: ParticipantData = body;

        await connectToDatabase();
        
        // Initialize models
        const Participant = mongoose.models.Participant || mongoose.model("Participant", ParticipantSchema);


        const participant = new Participant({
            name: roomData.name,  // This matches the required field in ParticipantSchema
            user_id: new mongoose.Types.ObjectId(), 
            joinedAt: new Date().toLocaleString("en-US", {timeZone: "Asia/Calcutta"})
        });

        // Save the participant first
        const savedParticipant = await participant.save();
    

        return NextResponse.json({
            message: "Participant created successfully",
            participant: savedParticipant,
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating room: ", error);
        return NextResponse.json({
            message: "Failed to create room",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}