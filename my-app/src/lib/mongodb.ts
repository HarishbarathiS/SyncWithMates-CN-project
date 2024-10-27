import mongoose from 'mongoose';
require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL || '';

if (!MONGODB_URL) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected: boolean;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  await mongoose.connect(MONGODB_URL);
  isConnected = true;
  console.log('MongoDB connected');
};
