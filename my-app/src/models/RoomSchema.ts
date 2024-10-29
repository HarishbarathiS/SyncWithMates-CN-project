import mongoose from 'mongoose';
const { Schema } = mongoose;
import ParticipantSchema from './ParaticipantSchema';
import MessageSchema from './MessageSchema';


const RoomSchema = new Schema({
  room_id: {
    type : String,
    required : true,
    unique : true,
  }, // String is shorthand for {type: String}
  host_name : {
    type : String,
    required : true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,  // Reference to Participant documents
    ref: 'Participant',  // Ensure this matches the Participant model name
    required: true,
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,  // Reference to Message documents
    ref: 'Message',  // Ensure this matches the Message model name
  }],
  createdAt: {
    type : String,
    default : Date.now,
  },
  ClosedAt : {
    type : String,
  }
});

export default RoomSchema;