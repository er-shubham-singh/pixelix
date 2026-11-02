import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

/**
 * Parses and sanitizes a MongoDB connection URI to ensure:
 * 1. Double slashes after host/port (e.g. cluster.mongodb.net//pixelix) are normalized to /pixelix
 * 2. Trailing slashes are stripped
 * 3. An explicit, valid database name without leading slashes is extracted
 */
export function parseMongoConnection(rawUri) {
  const defaultDbName = 'pixelix';
  if (!rawUri || typeof rawUri !== 'string') {
    return {
      uri: `mongodb://127.0.0.1:27017/${defaultDbName}`,
      dbName: defaultDbName
    };
  }

  const trimmed = rawUri.trim();

  // Match: (mongodb(+srv)?://[^/?#]+) followed by optional path (/...) and optional query (?...)
  const uriRegex = /^(mongodb(?:\+srv)?:\/\/[^/?#]+)(?:\/([^?#]*))?(\?.*)?$/i;
  const match = trimmed.match(uriRegex);

  if (!match) {
    return {
      uri: trimmed,
      dbName: defaultDbName
    };
  }

  const base = match[1]; // e.g. "mongodb+srv://user:pass@cluster.mongodb.net"
  const rawPath = match[2] || ''; // e.g. "/pixelix" or "pixelix" or ""
  const query = match[3] || ''; // e.g. "?retryWrites=true&w=majority"

  // Strip all leading and trailing slashes from the database name
  const cleanDbName = rawPath.replace(/^\/+|\/+$/g, '').trim() || defaultDbName;

  // Rebuild the clean URI with single slash before database name
  const cleanUri = `${base}/${cleanDbName}${query}`;

  return {
    uri: cleanUri,
    dbName: cleanDbName
  };
}

export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const { uri: cleanUri, dbName } = parseMongoConnection(ENV.MONGODB_URI);

    const conn = await mongoose.connect(cleanUri, {
      dbName: dbName,
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}`);
    console.warn('ℹ️ Pixelix Backend will continue with resilient in-memory storage fallback.');
    isConnected = false;
  }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

export const getDBStatus = () => {
  const currentDb = (mongoose.connection && mongoose.connection.name)
    ? mongoose.connection.name.replace(/^\/+/, '')
    : 'In-Memory Cache (Active)';
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    database: isConnected ? currentDb : 'In-Memory Cache (Active)'
  };
};
