import mongoose from 'mongoose';
const { Schema } = mongoose;


const ParaticipantSchema = new Schema({
  name: {
    type : String,
    required : true,
  },
  
  joinedAt: {
    type : String,
    default : Date.now
  },
  exitedAt : {
    type : String,
    required : true
  },
  
});

export default ParaticipantSchema;