import mongoose from 'mongoose';
const { Schema } = mongoose;


const ParticipantSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true,
  },
  
  joinedAt: {
    type : Date,
    default : Date.now
  },
  exitedAt : {
    type : Date,
    required : false
  },
  
});

export default ParticipantSchema;