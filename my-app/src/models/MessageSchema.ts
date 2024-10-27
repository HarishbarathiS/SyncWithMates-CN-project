import mongoose from 'mongoose';
const { Schema } = mongoose;


const MessageSchema = new mongoose.Schema({
  room_id: {
    type : String,
    required : true,
  },
  user: {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : false
  },
  sentAt : {
    type : Date,
    default : Date.now
  }
});

export default MessageSchema;