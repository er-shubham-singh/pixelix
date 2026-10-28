import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}`);
    console.warn('ℹ️ Pixelix Backend will continue with resilient in-memory storage fallback.');
    isConnected = false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  database: isConnected ? mongoose.connection.name : 'In-Memory Cache (Active)'
});
