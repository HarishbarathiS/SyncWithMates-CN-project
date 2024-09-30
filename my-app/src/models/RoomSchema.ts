import mongoose from 'mongoose';
const { Schema } = mongoose;
import ParticipantSchema from './ParaticipantSchema';


const RoomSchema = new Schema({
  room_id: {
    type : String,
    required : true,
    unique : true,
  }, // String is shorthand for {type: String}
  host : {
    type : Boolean,
    required : true
  },
  participants: [ParticipantSchema],
  createdAt: {
    type : String,
    default : Date.now
  },
  ClosedAt : {
    type : String,
    required : true
  }
});

export default RoomSchema;