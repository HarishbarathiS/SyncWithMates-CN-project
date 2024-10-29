import mongoose from 'mongoose';
const { Schema } = mongoose;


const ParticipantSchema = new mongoose.Schema({
  user_id : {
      type: mongoose.Schema.Types.ObjectId,  // Reference to Participant documents
      required : true,
  },
  name: {
    type : String,
    required : true,
  },
  joinedAt: {
    type : String,
    default : Date.now,
  },
  exitedAt : {
    type : String,
    required : false
  },
  
});

export default ParticipantSchema;