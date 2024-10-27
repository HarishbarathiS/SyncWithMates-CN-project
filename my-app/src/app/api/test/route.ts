import ParticipantSchema from "@/models/ParaticipantSchema";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: Request, res: Response) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();
    const {name} = reqBody
    const Participant = mongoose.model('Paraticipant', ParticipantSchema);
    const newParticipant = new Participant({
        name,
        joinedAt : new Date()
    }
    );
    const savedParticipant = await newParticipant.save(); // Adjust collection as needed
    return new Response(JSON.stringify(savedParticipant), { status: 200 });
  } catch (error) {
    console.error("Failed to create participant:", error);
    return new Response(JSON.stringify({ message: "Error creating participant" }), { status: 500 });
  }
}

