import mongoose from 'mongoose';
const { Schema } = mongoose;


const MessageSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',  // Reference to Room schema
    required: true,
  },
  user_id: {
    type : String,
    required : true
  },
  message : {
    type : String,
    required : false
  },
  sentAt : {
    type : String,
    default : Date.now
  }
});

export default MessageSchema;